var hamburger = document.querySelector('.hamburger');

if(hamburger) {
  hamburger.addEventListener('click', function(event) {
    event.preventDefault();
    if(hamburger.classList.contains('is-active')) {
      hamburger.classList.remove('is-active');
    } else {
      hamburger.classList.add('is-active');
    }
  });
}
