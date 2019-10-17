'use strict';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var similarTemplate = document.querySelector('#similar-wizard-template').content;
var similarWizard = similarTemplate.querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var fireballColors = ['#ee4830', '#30a8ee', '5ce6c0', '#e848d5', 'e6e848'];

// открывние/закрывание окна .setup
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var popupCloseEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupCloseEscHandler);
};
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupCloseEscHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Валидация
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя должно стостоять минимум из 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Фокус на юзернейм не закрывет окно ESC
userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', popupCloseEscHandler);
});
userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', popupCloseEscHandler);
});

// Кастомизация волшебника
var x = 1;
var getValueInOrder = function (array) {
  var value = array[x++];
  if (x > array.length - 1) {
    x = 0;
  }
  return value;
};

var setCustomFill = function (element, array) {
  element.style.fill = getValueInOrder(array);
};

var setCustomBg = function (element, array) {
  element.style.backgroundColor = getValueInOrder(array);
};

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setCoatColor = function () {
  setCustomFill(wizardCoat, coatColors);
};

wizardCoat.addEventListener('click', setCoatColor);

var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setEyesColor = function () {
  setCustomFill(wizardEyes, eyesColor);
};

wizardEyes.addEventListener('click', setEyesColor);

var fireball = setup.querySelector('.setup-fireball-wrap');
var setFireballColor = function () {
  setCustomBg(fireball, fireballColors);
};

fireball.addEventListener('click', setFireballColor);

// 4 волшебника внизу окна
var generateWizard = function (wizard) {
  var wizardElement = similarWizard.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var getRandomValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: wizardNames[getRandomValue(wizardNames)],
    surname: wizardSurnames[getRandomValue(wizardSurnames)],
    coatColor: coatColors[getRandomValue(coatColors)],
    eyesColor: eyesColor[getRandomValue(eyesColor)]
  };


  fragment.appendChild(generateWizard(wizard));

}
similarList.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');


