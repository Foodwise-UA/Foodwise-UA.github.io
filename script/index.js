const API_URL = 'https://api.apispreadsheets.com/data/Q1rx25WRYI3qcd4J/';



function smoothScroll(offsetFromTop = 40) {
  document.querySelectorAll('a.yakor').forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);

      const blockTopPosition = scrollTarget.getBoundingClientRect().top;
      let offset = blockTopPosition - offsetFromTop;

      window.scrollBy({
        top: offset,
        behavior: 'smooth',
      });
    });
  });
}

function changeNavBar() {
  let navBar = document.querySelector('nav.header__nav');
  let topPosition = document.scrollY;

  window.addEventListener('scroll', function (event) {
    event.preventDefault();

    let currentPosition = this.scrollY;

    if (currentPosition > topPosition && currentPosition > 90) {
      navBar.classList.remove('active');
    } else if (currentPosition < topPosition) {
      navBar.classList.add('active');
    }

    if (currentPosition > 50) {
      navBar.classList.add('shadow');
    } else {
      navBar.classList.remove('shadow');
    }

    topPosition = currentPosition;
  });
}

function getUserEmail() {
  const emailInput = document.querySelector('.email-input');
  const formButton = document.querySelector('.form-button');

  formButton.addEventListener('click', function (event) {
    event.preventDefault();
    let emailInputValue = emailInput.value;

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ data: { Email: emailInputValue } }),
    }).then((res) => {
      if (res.status === 201) {
        formButton.classList.add('success');
        formButton.innerHTML = 'Success';
      } else {
        formButton.classList.add('error');
        formButton.innerHTML = 'Error. Please, refresh page';
      }
    });
  });
}

window.onload = function () {
  smoothScroll();
  changeNavBar();
  getUserEmail();
};
