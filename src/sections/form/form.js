var submit = document.querySelector('.button-submit');
var fullName = document.querySelector('.contact__full-name');
var phoneNumber = document.querySelector('.contact__phone');
var contactForm = document.querySelector('.contact__form');
var contactEmail = document.querySelector('.email-input');
var requiredNameMessage = document.querySelector('.required__name-message');
var requiredPhoneMessage = document.querySelector('.required__phone-message');
var incorrectFormatMessage = document.getElementsByClassName('incorrect__format-message');

var validateName = function(name) {
  var pattern = /^([^0-9][a-zA-Z]{0,}\s[a-zA-z]{0,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  return pattern.test(name);
}

var validatePhoneNumber = function(phoneNumber) {
  var pattern = /^0(1\d{9}|9\d{8})$/;
  return pattern.test(phoneNumber);
}

var validateEmail = function(emailAddress) {
  var pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return pattern.test(emailAddress);
}

var contactFormValidation = function() {
  fullName.addEventListener('keyup', function(event) {
    if(validateName(fullName.value)) {
      fullName.classList.remove('error-input');
      incorrectFormatMessage[0].classList.remove('warning-show');
      fullName.classList.add('success-input');
    } else {
      fullName.classList.remove('success-input');
      fullName.classList.add('error-input');
    }
  });

  phoneNumber.addEventListener('keyup', function(event) {
    if(validatePhoneNumber(phoneNumber.value)) {
      phoneNumber.classList.remove('error-input');
      incorrectFormatMessage[1].classList.remove('warning-show');
      phoneNumber.classList.add('success-input');
    } else {
      phoneNumber.classList.remove('success-input');
      phoneNumber.classList.add('error-input');
    }
  });

  contactEmail.addEventListener('keyup', function(event) {
    if(validateEmail(contactEmail.value)) {
      contactEmail.classList.remove('error-input');
      contactEmail.classList.add('success-input');
    } else {
      contactEmail.classList.remove('success-input');
      contactEmail.classList.add('error-input');
    }
  });

  submit.addEventListener('click', function(event) {
    event.preventDefault();
    if(fullName.value == '') {
      requiredNameMessage.classList.add('warning-show');
    } else if(fullName.value && validateName(fullName.value)) {
        incorrectFormatMessage[0].classList.remove('warning-show');
        requiredNameMessage.classList.remove('warning-show');
    } else if(fullName.value && !validateName(fullName.value)) {
        requiredNameMessage.classList.remove('warning-show');
        incorrectFormatMessage[0].classList.add('warning-show');
    }

    if(phoneNumber.value == '') {
      requiredPhoneMessage.classList.add('warning-show');
    } else if(phoneNumber.value && validatePhoneNumber(phoneNumber.value)) {
        incorrectFormatMessage[1].classList.remove('warning-show');
        requiredPhoneMessage.classList.remove('warning-show');
    } else if(phoneNumber.value && !validatePhoneNumber(phoneNumber.value)) {
        requiredPhoneMessage.classList.remove('warning-show');
        incorrectFormatMessage[1].classList.add('warning-show');
    }
  });
}

if(contactForm) {
  contactFormValidation();
}
