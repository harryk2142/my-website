import { getApp, getPostById, like } from "../../scripts/firebase";

const loadLikes = async (postID: string) => {
  const app = await getApp();
  const post = await getPostById(app, postID);
  if (post?.likes) {
    (document.querySelector("#like-counter") as HTMLElement).innerText =
      post.likes + "";
  }
};
const submitLike = async (postID: string) => {
  const app = await getApp();
  const likes = like(app, postID);
  return likes;
};

export { loadLikes, submitLike };
