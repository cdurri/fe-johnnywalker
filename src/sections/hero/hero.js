var marginY = 0;
var scroller = null;
var destination = 0;

var speed = 5;

var heroScroll = document.querySelector(".hero__scroll");

function smoothScroll() {
  // get the number of pixels the document is scrolled along the Y(vertical) axis
  marginY = window.pageYOffset;
  // get the number of pixels distance, the element is from the top of it's parent node
  destination = document.getElementById("info-drink").offsetTop;

  // timeout function that executes after a small delay
  scroller = setTimeout(function() {
    // recursive function call on itself,  this creates the smooth scroll effect
    smoothScroll();
  }, 1);

  // increment the vertical scroll by 5 pixels each time to create smooth scroll
  marginY = marginY + speed;

  // stop timeout function executing when the vetical scroll is greater than or equal to the required scroll distance
  if(marginY >= destination) {
    clearTimeout(scroller);
  }

  /* call the scroll on the window passing values for the x and y coordinates at the top left, x = 0 as not concerned with x axis,
     y = marginY which will increment each because of recursion and create the smooth scroll effect
  */
  window.scroll(0, marginY);
}

if(heroScroll) {
  heroScroll.addEventListener('click', function(event) {
      /*  prevent the browsers default action from executing. In this the default action is a page reload because a anchor element
          with href="#" is being clicked
      */
      event.preventDefault();
      smoothScroll();
  });
}
