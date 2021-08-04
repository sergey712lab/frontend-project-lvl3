import axios from 'axios';
import validate from './validate';
import parser from './parser';
import { watchedState } from './view';

const getUrl = (fields) => {
  const formData = new FormData(fields);
  return formData.get('url');
};

export default (e) => {
  e.preventDefault();

  watchedState.inputUrl = getUrl(e.target);
  const validationResult = validate({ url: watchedState.inputUrl });

  if (validationResult && !watchedState.validUrls.includes(watchedState.inputUrl)) {
    const form = document.querySelector('form');
    form.reset();

    const url = `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(watchedState.inputUrl)}`;

    axios.get(url)
      .then((response) => {
        const { feedData, postsData } = parser(response.data.contents);

        watchedState.feeds.push(feedData);
        postsData.forEach((post) => watchedState.posts.unshift(post));
      })
      .catch(() => console.log('Network response was not ok.'));

    watchedState.validUrls.push(watchedState.inputUrl);
  } else {
    watchedState.error = 'The link must be a valid URL';
  }

  watchedState.inputUrl = '';
  watchedState.isValid = !!watchedState.validUrls.length;
};
