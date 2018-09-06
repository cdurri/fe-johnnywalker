var day, month, year, selectedDate, currentDate;
var age = 18;

var fullUrl = window.location.href;
var endUrl = fullUrl.split('/').pop();

function checkUrl() {
  if(endUrl == 'home.html' && location.hash !== 'loaded') {
    location.hash = 'loaded';
    window.location.assign('index.html');
  }
}

function checkAge() {
    var enterBtn = document.querySelector(".age-gate__enter");
    if(enterBtn) {
        enterBtn.addEventListener("click", function(event) {
        event.preventDefault();

          day = document.getElementById('age-gate__day');
        month = document.getElementById('age-gate__month');
         year = document.getElementById('age-gate__year');

         selectedDate = new Date();
         selectedDate.setFullYear( year.value, month.value - 1, day.value );
         currentDate = new Date();
         currentDate.setFullYear(currentDate.getFullYear() - age);

         if( day.value == 'notselected' || month.value == 'notselected' || year.value == 'notselected' ) {
           alert('Please enter your date of birth');
           return false;
         } else if ((currentDate - selectedDate) < 0) {
           alert('Entry denied, currently you are not of legal drinking age');
           return false;
         } else {
           window.location.assign("home.html#loaded");
         }
      });
    }
}

checkUrl();
checkAge();
