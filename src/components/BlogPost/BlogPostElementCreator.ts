import { Comment } from "../../scripts/firebase.js";

const fillCommentWithData = (commentDiv: HTMLElement, element: Comment) => {
  var username = document.createElement("span");
  username.className = "comment-username";
  username.textContent = element.username;
  var date = document.createElement("span");
  date.className = "comment-date";
  date.textContent = new Date(element.date).toLocaleString();
  var text = document.createElement("div");
  text.className = "commment-text";
  text.textContent = element.text;
  var replyBtn = document.createElement("button");
  replyBtn.className = "reply-btn";
  replyBtn.id = "reply-btn-" + element.id;
  replyBtn.textContent = "Antworten";

  commentDiv.appendChild(username);
  commentDiv.appendChild(date);
  commentDiv.appendChild(text);
  commentDiv.appendChild(replyBtn);
  replyBtn.addEventListener("click", async (event) => {
    const a = document.querySelector("#reply-box-" + element.id);
    if (a) {
      return;
    }
    appendCommentReplyInputBlock(commentDiv, element.id);
  });
};
const appendCommentReplyInputBlock = (
  parent: HTMLElement,
  commentID: string
) => {
  var block = document.createElement("div");
  block.id = "reply-box-" + commentID;
  block.className = "comment-reply-input-block";
  var hiddenParentID = document.createElement("input");
  hiddenParentID.textContent = commentID;
  hiddenParentID.style.display = "none";
  var hiddenBotProtection = document.createElement("input");
  var lblUsername = document.createElement("label");
  lblUsername.textContent = "Username (optional)";
  var inputUsername = document.createElement("input");
  inputUsername.className = "comment-reply-input";
  inputUsername.id = "comment-reply-username-" + commentID;
  inputUsername.placeholder = "Anonym";
  var lblComment = document.createElement("label");
  lblComment.textContent = "Kommentar:";
  var inputComment = document.createElement("textarea");
  inputComment.className = "comment-reply-input";
  inputComment.id = "comment-reply-text-" + commentID;
  inputComment.placeholder = "Hier eingeben...";
  inputComment.cols = 45;
  inputComment.rows = 8;
  var buttonAbbrechen = document.createElement("button");
  buttonAbbrechen.id = "abbrechen-btn-" + commentID;
  buttonAbbrechen.className = "abbrechen-btn";
  buttonAbbrechen.textContent = "Abbrechen";
  var buttonSubmit = document.createElement("button");
  buttonSubmit.id = "send-reply-btn-" + commentID;
  buttonSubmit.className = "send-reply-btn primary";
  buttonSubmit.textContent = "Antwort senden";
  block.appendChild(hiddenParentID);
  block.appendChild(lblUsername);
  block.appendChild(inputUsername);
  block.appendChild(lblComment);
  block.appendChild(inputComment);
  block.appendChild(buttonAbbrechen);
  block.appendChild(buttonSubmit);
  parent.insertBefore(block, parent.children[4]);
  buttonAbbrechen.addEventListener("click", (event) => {
    // @ts-ignore
    const id = event.target.id
      .split("-")
      .at(event.target.id.split("-").length - 1);
    const box = document.querySelector("#reply-box-" + id);
    box.parentNode.removeChild(box);
  });
  buttonSubmit.addEventListener("click", (event) => {
    import("./Content.js").then(async (contentHelper) => {
      // @ts-ignore
      const id = event.target.id
        .split("-")
        .at(event.target.id.split("-").length - 1);
      const box = document.querySelector("#reply-box-" + id);
      const postID = document.querySelector("#post-id").innerText;
      const text = document.querySelector("#comment-reply-text-" + id).value;
      let username = document.querySelector(
        "#comment-reply-username-" + id
      ).value;
      if (!username) {
        username = "ANONYM";
      }
      if (text) {
        await contentHelper.submitReply(postID, id, text, username);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      box.parentNode.removeChild(box);
    });
  });
};
function addRepliesToParent(parent: HTMLElement, replies: Comment[]) {
  replies.forEach((element) => {
    // Kommentar zur Liste hinzufügen
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment-replies comment-block";
    commentDiv.id = element.id;
    fillCommentWithData(commentDiv, element);

    parent.appendChild(commentDiv);
    if (element.replies && element.replies.length > 0) {
      addRepliesToParent(commentDiv, element.replies);
    }
  });
}
function loadComments(comments: Comment[]) {
  comments.forEach((element) => {
    // Kommentar zur Liste hinzufügen
    var commentDiv = document.createElement("div");
    commentDiv.className = "comment-block";
    commentDiv.id = element.id;

    fillCommentWithData(commentDiv, element);

    if (element.replies && element.replies.length > 0) {
      addRepliesToParent(commentDiv, element.replies);
    }

    document.getElementById("comments")?.appendChild(commentDiv);
  });
}
