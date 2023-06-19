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

const clickAntworten = (event: MouseEvent) => {
  let blogPostId = (document.querySelector("#blog-post-id") as HTMLElement)
    .innerText;
  const target = event.target as HTMLElement;
  const targetId = target.id;
  const id = targetId.split("-").at(targetId.split("-").length - 1);
  const createdForm = createCommentInputForm(blogPostId, id) as HTMLElement;

  const box = document.createElement("div") as HTMLDivElement;
  box.id = "reply-box-" + id;
  box.appendChild(createdForm);
  (target.parentNode as HTMLElement).appendChild(box);
};

const createCommentBox = (comment: Comment) => {
  const createdCommentBox = document.createElement("div") as HTMLDivElement;
  const clonedBox = (
    document.querySelector("#comment-block-template") as HTMLTemplateElement
  ).content.cloneNode(true) as HTMLElement;
  if (clonedBox) {
    (
      clonedBox.querySelector(".comment-username") as HTMLSpanElement
    ).textContent = comment.username;
    (clonedBox.querySelector(".comment-date") as HTMLSpanElement).textContent =
      comment.formattedDate ? comment.formattedDate : "";
    (clonedBox.querySelector(".comment-text") as HTMLSpanElement).textContent =
      comment.text;
    (
      clonedBox.querySelector(".reply-btn") as HTMLButtonElement
    ).addEventListener("click", clickAntworten);
    (clonedBox.querySelector(".reply-btn") as HTMLButtonElement).id =
      "reply-btn-" + comment.id;
    createdCommentBox.appendChild(clonedBox);
  }
  return createdCommentBox;
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
function addHtmlRepliesToParent(parent, replies) {
  const repliesContainer = document.createElement("div") as HTMLDivElement;
  repliesContainer.classList.add("comment-replies");
  repliesContainer.classList.add("comment-block");
  replies.forEach((element) => {
    var commentDiv = document.createElement("div");
    commentDiv.id = element.id;
    const createdBox = createCommentBox(element);
    commentDiv.appendChild(createdBox);
    repliesContainer.appendChild(commentDiv);

    if (element.replies && element.replies.length > 0) {
      addHtmlRepliesToParent(commentDiv, element.replies);
    }
  });
  parent.appendChild(repliesContainer);
}
function fillHtmlComment(comments) {
  comments.forEach((element) => {
    const commentContainer = document.createElement("div") as HTMLDivElement;
    commentContainer.classList.add("comment-block");
    const createdBox = createCommentBox(element);
    commentContainer.appendChild(createdBox);
    if (element.replies && element.replies.length > 0) {
      addHtmlRepliesToParent(commentContainer, element.replies);
    }

    document.getElementById("comments")?.appendChild(commentContainer);
  });
}
const createCommentsBox = (postId: string) => {
  loadCommentsFromFirebase(postId).then((comments) => {
    if (comments.length > 0) {
      const commentsCounter = comments.length;
      (document.querySelector("#comments-counter") as HTMLElement).innerText =
        commentsCounter.toString();
      const commentsWithReplies = fillCommentsWithReplies(comments);
      fillHtmlComment(commentsWithReplies);
    } else {
      const noCommentsSpan = document.createElement("span") as HTMLElement;
      noCommentsSpan.innerText = "Keine Kommentare vorhanden";
      document.getElementById("comments")?.appendChild(noCommentsSpan);
    }
  });
};

const submitComment = async (postId, text, username) => {
  const app = await getApp();
  await addComment(app, postId, text, username);
};
const submitReply = async (postId, parentCommentId, text, username) => {
  const app = await getApp();

  await addCommentReply(app, postId, parentCommentId, text, username);
};

const clickAbbrechen = (event: MouseEvent) => {
  const id = (event.target as HTMLElement).id
    .split("-")
    .at((event.target as HTMLElement).id.split("-").length - 1);
  const box = document.querySelector("#reply-box-" + id);
  const parent = box?.parentElement;

  if (parent && box) {
    parent.removeChild(box);
  }
};

const clickAbsenden = async (event: MouseEvent) => {
  const parent = (event.target as HTMLElement).parentElement;
  const protection = parent?.querySelector(
    "[name='protection']"
  ) as HTMLInputElement;
  const protectionValue = protection.value;
  const blogPost = parent?.querySelector(
    "[name='blog-post']"
  ) as HTMLInputElement;
  const blogPostId = blogPost.value;
  const parentComment = parent?.querySelector(
    "[name='parent-comment']"
  ) as HTMLInputElement;
  const parentCommentId = parentComment.value;
  const username = parent?.querySelector(
    "[name='input-username']"
  ) as HTMLInputElement;
  let usernameValue = username.value;
  const text = parent?.querySelector("[name='input-text']") as HTMLInputElement;
  const textValue = text.value;

  if (!textValue || protectionValue) {
    if (!parentCommentId) {
      console.log("EMPTY PARENT COMMENT");
    }
    console.log("EMPTY TEXT");

    return;
  }

  if (!usernameValue) {
    usernameValue = "ANONYM";
  }

  if (textValue) {
    if (parentCommentId) {
      await submitReply(blogPostId, parentCommentId, textValue, usernameValue);
    } else {
      await submitComment(blogPostId, textValue, usernameValue);
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
};

const createCommentInputForm = (
  blogPostId: string,
  parentCommentId: string = ""
) => {
  const idProtection = parentCommentId
    ? "protection-" + parentCommentId
    : "protection-" + blogPostId;
  const idBlogPost = "blog-post-" + blogPostId;
  const idParentComment = "parent-comment-" + parentCommentId;
  const idUsernameInput = parentCommentId
    ? "input-username-" + parentCommentId
    : "input-username-" + blogPostId;
  const idTextInput = parentCommentId
    ? "input-text-" + parentCommentId
    : "input-text-" + blogPostId;
  const idAbsendenButton = blogPostId
    ? "senden-btn-" + parentCommentId
    : "senden-btn-" + blogPostId;
  const idAbbrechenButton = blogPostId
    ? "abbrechen-btn-" + parentCommentId
    : "abbrechen-btn-" + blogPostId;

  const clonedForm = (
    document.querySelector("#comment-input-template") as HTMLTemplateElement
  ).content.cloneNode(true) as HTMLElement;
  if (clonedForm) {
    (clonedForm.querySelector("#protection") as HTMLInputElement).id =
      idProtection;
    (clonedForm.querySelector("#blog-post") as HTMLInputElement).value =
      blogPostId;
    (clonedForm.querySelector("#blog-post") as HTMLInputElement).id =
      idBlogPost;
    (clonedForm.querySelector("#parent-comment") as HTMLInputElement).value =
      parentCommentId;
    (clonedForm.querySelector("#parent-comment") as HTMLInputElement).id =
      idParentComment;
    (clonedForm.querySelector("#lbl-input-username") as HTMLLabelElement).id =
      "lbl-" + idUsernameInput;
    (
      clonedForm.querySelector("#lbl-" + idUsernameInput) as HTMLLabelElement
    ).setAttribute("for", idUsernameInput);
    (clonedForm.querySelector("#input-username") as HTMLInputElement).id =
      idUsernameInput;

    (clonedForm.querySelector("#lbl-input-text") as HTMLLabelElement).id =
      "lbl-" + idTextInput;
    (
      clonedForm.querySelector("#lbl-" + idTextInput) as HTMLLabelElement
    ).setAttribute("for", idTextInput);
    (clonedForm.querySelector("#input-text") as HTMLInputElement).id =
      idTextInput;

    (clonedForm.querySelector("#abbrechen-btn") as HTMLButtonElement).id =
      idAbbrechenButton;
    (
      clonedForm.querySelector("#" + idAbbrechenButton) as HTMLButtonElement
    ).hidden = !parentCommentId;
    (
      clonedForm.querySelector("#" + idAbbrechenButton) as HTMLButtonElement
    ).addEventListener("click", clickAbbrechen);
    (clonedForm.querySelector("#absenden-btn") as HTMLButtonElement).id =
      idAbsendenButton;
    (
      clonedForm.querySelector("#" + idAbsendenButton) as HTMLButtonElement
    ).addEventListener("click", clickAbsenden);

    return clonedForm;
  }
};

export { createCommentBox, createCommentsBox, createCommentInputForm };
