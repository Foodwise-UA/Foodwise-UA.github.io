document.querySelectorAll('a.yakor').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);

    const offsetFromTop = 40;

    const blockTopPosition = scrollTarget.getBoundingClientRect().top;
    let offset = blockTopPosition - offsetFromTop;

    window.scrollBy({
      top: offset,
      behavior: 'smooth',
    });
  });
});

let topPosition = document.scrollY;
let navBar = document.querySelector('nav.header__nav');

window.addEventListener('scroll', function (event) {
  event.preventDefault();

  let currentPosition = this.scrollY;

  if (currentPosition > topPosition) {
    navBar.classList.remove('active');
  } else if (currentPosition < topPosition) {
    navBar.classList.add('active');
  }

  topPosition = currentPosition;
});

// const form = document.querySelector('.contact__form');
// let emailInput = document.querySelector('.email-input');
// console.log(emailInput);

// form.addEventListener('onsubmit', function (event) {
//   event.preventDefault();

  
//   fetch("https://api.apispreadsheets.com/data/Q1rx25WRYI3qcd4J/", {
// 	method: "POST",
// 	body: JSON.stringify({"data": {"Email":"value"}}),
// }).then(res =>{
// 	if (res.status === 201){
// 		alert('OK')
// 	}
// 	else{
// 		alert('Fail')
// 	}
// })
// });
