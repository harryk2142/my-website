import {
  getApp,
  getBlogPostByIdentifier,
  savePost,
} from "../../scripts/firebase";

const createBlogPost = async (blogPostIdentifier: string) => {
  const app = await getApp();
  const newPostID = await savePost(app, blogPostIdentifier);

  return newPostID;
};

const loadBlogPost = async (blogPostIdentifier: string) => {
  const app = await getApp();
  const newPostID = await getBlogPostByIdentifier(app, blogPostIdentifier);
  return newPostID;
};

export { loadBlogPost, createBlogPost };
