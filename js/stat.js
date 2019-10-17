'use strict';

var HISTOGRAM_HEIGHT = 150;
var INITIAL_X = 150;
var INITIAL_Y = 245;
var COLUMN_INDENT = 90;
var COLUMN_WIDTH = 40;
var LINE_HEIGHT = 20;


window.renderStatistics = function (ctx, names, times) {

  // Тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Облако
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  // Текст про победу
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 230, 40);
  ctx.fillText('Список результатов:', 220, 60);


  // Максимальное значение
  var getMaxValue = function (anyArray) {
    var maxValue = -1;

    for (var index = 0; index < anyArray.length; index++) {
      if (anyArray[index] > maxValue) {
        maxValue = anyArray[index];
      }
    }
    return maxValue;
  };

  // Цвет
  var getPlayerColor = function (playerName) {
    if (playerName === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    } else {
      return 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
    }
  };

  // Гистограмма
  var MAX_TIME = getMaxValue(times);
  for (var j = 0; j < times.length; j++) {
    var playerTime = Math.round(times[j]);
    var columnHeight = playerTime * HISTOGRAM_HEIGHT / (MAX_TIME - 0);

    ctx.fillStyle = getPlayerColor(names[j]);
    ctx.fillRect(INITIAL_X + j * COLUMN_INDENT, INITIAL_Y, COLUMN_WIDTH, columnHeight * (-1));

    ctx.fillStyle = '#000000';
    ctx.fillText(playerTime, INITIAL_X + j * COLUMN_INDENT, INITIAL_Y - columnHeight - LINE_HEIGHT / 2);
    ctx.fillText(names[j], INITIAL_X + j * COLUMN_INDENT, INITIAL_Y + LINE_HEIGHT);
  }

};
