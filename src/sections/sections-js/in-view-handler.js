function handleInview() {
  var hero = document.querySelector('.hero');
  var ageModal = document.querySelector('.age-modal');

  var arrElements = [{
      element: '.hero'
    },
    {
      element: '.age-modal'
    },
    {
      element: '.info-drink__title'
    },
    {
      element: '.info-drink__description'
    },
    {
      element: '.info-drink__image'
    },
    {
      element: '.info-drink__recipie'
    },
    {
      element: '.contact__title'
    },
    {
      element: '.contact__intro'
    },
    {
      element: '.contact__form'
    },
    {
      element: '.footer'
    },
  ];

  for (var i = 0; i < arrElements.length; i++) {
    if (document.querySelectorAll(arrElements[i].element).length > 0) {
      inView(arrElements[i].element)
        .on('enter', section => {
          section.classList.add('is-inview');
        });
    }
  }
}

handleInview();
