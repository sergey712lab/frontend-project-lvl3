import handler from './handler';

export default () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', handler);
};
