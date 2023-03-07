document.querySelectorAll('a.yakor').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);

    const offsetFromTop = 130;

    const blockTopPosition = scrollTarget.getBoundingClientRect().top;
    let offset = blockTopPosition - offsetFromTop;

    window.scrollBy({
      top: offset,
      behavior: 'smooth',
    });
  });
});

let topPosition = document.scrollY;
let navBar = document.querySelector('nav.header__nav')
console.log(navBar);

window.addEventListener('scroll', function(event) {
    event.preventDefault();

    let currentPosition = this.scrollY;

    if (currentPosition > topPosition) {
        navBar.classList.remove('active');
        console.log('to down')
    } else {
        navBar.classList.add('active');
        console.log('to top');
    }

    topPosition = currentPosition;
})
