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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function getUserEmail() {
  const emailInput = document.querySelector('.email-input');
  const formButton = document.querySelector('.form-button');
  const emailValidatorText = document.querySelector('.email-validator-text');

  formButton.addEventListener('click', function (event) {
    event.preventDefault();
    let emailInputValue = emailInput.value;
    const isValidEmail = validateEmail(emailInputValue);

    if (isValidEmail) {
      emailValidatorText.classList.remove('active');
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
    } else {
      emailValidatorText.classList.add('active');
    }
  });
}

function getSelectedRadioButton(className) {
  const radioButtons = document.querySelectorAll(`.${className}`);

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i];
    }
  }

  return null;
}

const radioButtons = document.querySelectorAll('.nav__block-input');
radioButtons.forEach((item) =>
  item.addEventListener('change', changeURLLanguage)
);

function changeURLLanguage() {
  let lang = getSelectedRadioButton('nav__block-input').id;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

function changeLanguage() {
  const allLang = ['ua', 'en'];

  let hash = window.location.hash;
  hash = hash.substring(1);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#ua';
    location.reload();
  }

  let selectedLanguage = document.querySelector(`#${hash}`);
  console.log(selectedLanguage);
  selectedLanguage.checked = true;

  for (let key in langArr) {
    document.querySelector(`.lng-${key}`).innerHTML = langArr[key][hash];
  }

  console.log(langImgArr);

  for (let key in langImgArr) {
    const image = document.querySelector(`.lng-${key}`);
    // console.log(image.style.backgroundImage);
    // console.log(`url("${langImgArr[key][hash]}")`)

    document.querySelector(
      `.lng-${key}`
    ).style.backgroundImage = `url("${langImgArr[key][hash]}")`;
  }
}

window.onload = function () {
  smoothScroll();
  changeNavBar();
  getUserEmail();
  changeLanguage();
};
