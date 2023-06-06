const getPostID = async (blogPostIdentifier) => {
  const { getApp, getBlogPostByIdentifier, savePost } = await import(
    "src/scripts/firebase"
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
const loadLikes = async (postID) => {
  const { getApp, getPostById } = await import("src/scripts/firebase");
  const app = await getApp();
  const post = await getPostById(app, postID);
  return post?.likes;
};
const submitLike = async (postID) => {
  const { getApp, like } = await import("src/scripts/firebase");
  const app = await getApp();
  const likes = like(app, postID);
  return likes;
};

// COMMENTS
const loadComments = async (postID) => {
  const { getApp, getCommentsWithReplies } = await import(
    "src/scripts/firebase"
  );
  const app = await getApp();
  const commentsWithReplies = await getCommentsWithReplies(app, postID);
  return commentsWithReplies;
};
const submitComment = async (postID, commentText, author) => {
  const { getApp, addComment } = await import("src/scripts/firebase");
  const app = await getApp();
  console.log(postID);
  console.log(author);
  console.log(commentText);
  addComment(app, postID, commentText, author);
};
const submitReply = async (postID, commentParentID, commentText, author) => {
  const { getApp, addCommentReply } = await import("src/scripts/firebase");
  const app = await getApp();
  addCommentReply(app, postID, commentParentID, commentText, author);
};

export {
  getPostID,
  loadComments,
  loadLikes,
  submitComment,
  submitReply,
  submitLike,
};
