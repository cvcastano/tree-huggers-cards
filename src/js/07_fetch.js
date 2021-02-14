'use strict';

const createBtn = document.querySelector('.js-create-btn');
const cardResult = document.querySelector('.js-shareclick');
const shareHidden = document.querySelector('.js-share-hidden');

const twitterHiddenElement = document.querySelector('.js-twitter-share');

let shareLink = '';

function handleCreateBtn(ev) {
  ev.preventDefault();

  fetchAPI();

  shareHidden.classList.remove('js-share-hidden');
  createBtn.classList.remove('share__button');
  createBtn.classList.add('share__button--dis');
  createBtn.disabled = true;
  twitterHiddenElement.classList.remove('hidden-share');
}

createBtn.addEventListener('click', handleCreateBtn);

function fetchAPI() {
  const url = 'https://profileawesome.herokuapp.com/card';
  // eslint-disable-next-line no-undef
  const data = getUserData();
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server response:', data);
      if (data.success === true) {
        data.cardURL;
        shareLink = data.cardURL;
        const linkElement = document.querySelector('.js-card-link');
        linkElement.innerHTML = `<a href="${shareLink}" class="share__result--link js-shareclick" target="_blank">${shareLink}</a>;`;
      } else {
        cardResult.innerHTML = data.error;
      }
    });
}