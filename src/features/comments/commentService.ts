import {
  Comment,
  addComment,
  addCommentReply,
  getApp,
  getComments,
} from "../../scripts/firebase";
const loadCommentsFromFirebase = async (postID: string) => {
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
  postId: string,
  text: string,
  username: string
) => {
  const app = await getApp();
  await addComment(app, postId, text, username);
};
const submitReply = async (
  postId: string,
  parentCommentId: string,
  text: string,
  username: string
) => {
  const app = await getApp();
  await addCommentReply(app, postId, parentCommentId, text, username);
};
export {
  loadCommentsFromFirebase,
  fillCommentsWithReplies,
  submitComment,
  submitReply,
};
