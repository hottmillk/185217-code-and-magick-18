'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
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
  var getMaxValue = function(anyArray) {
    var maxValue = -1;

    for (var index = 0; index < anyArray.length; index++) {
      if (anyArray[index] > maxValue) {
        maxValue = anyArray[index];
      }
    }
    return maxValue;
  };

  // Цвет
  var getPlayerColor = function(playerName) {
    if (playerName === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    } else {
      return 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
    }
  };

  // Гистограмма
  var histogramHeight = 150;
  var initialX = 150;
  var initialY = 245;
  var columnIndent = 90;
  var columnWidth = 40;
  var lineHeight = 20;
  var maxTime = getMaxValue(times);

  for (var j = 0; j < times.length; j++) {
    var playerTime = Math.round(times[j]);
    var columnHeight = playerTime * histogramHeight / (maxTime - 0);

    ctx.fillStyle = getPlayerColor(names[j]);
    ctx.fillRect(initialX + j * columnIndent, initialY, columnWidth, columnHeight * (-1));

    ctx.fillStyle = '#000000';
    ctx.fillText(playerTime, initialX + j * columnIndent, initialY - columnHeight - lineHeight / 2);
    ctx.fillText(names[j], initialX + j * columnIndent, initialY + lineHeight);
  }

};
