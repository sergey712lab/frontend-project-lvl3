import onChange from 'on-change';

export const view = {
  inputUrl: '',
  validUrls: [],
  error: '',
  isValid: false,
  feeds: [
    // {id: '', title: '', description: ''},
  ],
  posts: [
    // {id: '', title: '', description: '', link: ''},
  ],
};

const containerBuilder = (title, list) => `
  <div class="card border-0">
    <div class="card-body">
      <h2 class="card-title h4">${title}</h2>
    </div>
    ${list}
  </div>
`;

const ulElemBuilder = () => {
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  return feedsList;
};

const liElemContentBuilder = (title, description) => `
      <h3 class="h6 m-0">${title}</h3>
      <p class="m-0 small text-black-50">${description}</p>
`;

const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');

export const watchedState = onChange(view, (path) => {
  if (path === 'feeds') {
    const feedsList = ulElemBuilder();

    view.feeds.forEach((feed) => {
      const feedItem = document.createElement('li');
      feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

      feedItem.innerHTML = liElemContentBuilder(feed.title, feed.description);

      feedsList.prepend(feedItem);
    });
    feeds.innerHTML = containerBuilder('Фиды', feedsList.innerHTML);
  }

  if (path === 'posts') {
    const postsList = ulElemBuilder();

    view.posts.forEach((post) => {
      const postItem = document.createElement('li');
      postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      postItem.innerHTML = `
      <a href="${post.link}" class="fw-bold" target="_blank" rel="noopener noreferrer">${post.title}</a>
      <button type="button" class="btn btn-outline-primary btn-sm">Просмотр</button>
      `;

      postsList.append(postItem);
    });
    posts.innerHTML = containerBuilder('Посты', postsList.innerHTML);
  }

  if (path === 'error') {
    const input = document.querySelector('input');
    input.classList.add('is-invalid');
  }
});
