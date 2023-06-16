import { Comment } from "../../scripts/firebase";

const getPostID = async (blogPostIdentifier) => {
  const { getApp, getBlogPostByIdentifier, savePost } = await import(
    "../../scripts/firebase"
  );
  const app = await getApp();
  const post = await getBlogPostByIdentifier(app, blogPostIdentifier);
  if (post) {
    return post.id;
  }

  const newPostID = await savePost(app, blogPostIdentifier);
  return newPostID;
};

// LIKE
const loadLikes = async (postID: string) => {
  const { getApp, getPostById } = await import("../../scripts/firebase");
  const app = await getApp();
  const post = await getPostById(app, postID);
  return post?.likes;
};
const submitLike = async (postID: string) => {
  const { getApp, like } = await import("../../scripts/firebase");
  const app = await getApp();
  const likes = like(app, postID);
  return likes;
};

// COMMENTS
const loadComments = async (postID: string) => {
  const { getApp, getComments } = await import("../..//scripts/firebase");
  const app = await getApp();
  const comments = await getComments(app, postID);

  return comments;
};
const fillCommentsWithReplies = (comments: Comment[]) => {
  function addReplies(comments: Comment[]) {
    comments.forEach((comment) => {
      const replies = comments.filter((c) => c.parentID === comment.id);
      if (replies.length > 0) {
        comment.replies = replies;
        addReplies(replies);
      }
    });
  }

  addReplies(comments);

  const topLevelComments = comments.filter((comment) => !comment.parentID);

  return topLevelComments;
};
const submitComment = async (
  postID: string,
  commentText: string,
  author: string
) => {
  const { getApp, addComment } = await import("../..//scripts/firebase");
  const app = await getApp();
  console.log(postID);
  console.log(author);
  console.log(commentText);
  addComment(app, postID, commentText, author);
};
const submitReply = async (
  postID: string,
  commentParentID: string,
  commentText: string,
  author: string
) => {
  const { getApp, addCommentReply } = await import("../..//scripts/firebase");
  const app = await getApp();
  addCommentReply(app, postID, commentParentID, commentText, author);
};

export {
  fillCommentsWithReplies,
  getPostID,
  loadComments,
  loadLikes,
  submitComment,
  submitReply,
  submitLike,
};
