import { v1 } from 'uuid';

const getContent = (doc, tag) => doc.querySelector(tag).textContent;

export default (content) => {
  const result = {
    feedData: '',
    postsData: [],
  };

  const parser = new DOMParser();
  const rssData = parser.parseFromString(content, 'text/xml');
  const feedId = v1();
  const feedTitle = getContent(rssData, 'title');
  const feedDescription = getContent(rssData, 'description');

  const posts = rssData.querySelectorAll('item');
  result.feedData = { id: feedId, title: feedTitle, description: feedDescription };

  posts.forEach((post) => {
    const postTitle = getContent(post, 'title');
    const postDescription = getContent(post, 'description');
    const postLink = getContent(post, 'link');
    result.postsData.push(
      {
        id: feedId,
        title: postTitle,
        description: postDescription,
        link: postLink,
      },
    );
  });
  return result;
};
