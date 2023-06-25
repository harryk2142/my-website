import {
  FirebaseApp,
  initializeApp,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js";

const sammlungName = "posts";
export interface Comment {
  id: string;
  postID?: string;
  date: Date;
  formattedDate?: string;
  username: string;
  text: string;
  parentID?: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  blogPostIdentifier: string;
  likes: number;
}

let firebaseApp: FirebaseApp;

const postConverter = {
  toFirestore(post: Post) {
    return { title: post.blogPostIdentifier, likes: post.likes };
  },
  fromFirestore(snapshot): Post {
    const data = snapshot.data()!;
    const id = snapshot.id;
    return {
      id: id,
      blogPostIdentifier: data.blogPostIdentifier ?? "no title",
      likes: data.likes ?? 0,
    };
  },
};
const commentConverter = {
  toFirestore(comment: Comment) {
    return {
      date: comment.date,
      username: comment.username ?? "ANONYM",
      text: comment.text ?? "",
    };
  },
  fromFirestore(snapshot): Comment {
    const data = snapshot.data()! as Comment;
    const postID = snapshot.ref.parent.parent?.id;
    const id = snapshot.id;

    return {
      id: id,
      postID: postID,
      date: data.date ?? "0",
      formattedDate: new Date(data.date).toLocaleString(),
      username: data.username ?? "ANONYM",
      text: data.text ?? "",
      parentID: data.parentID ?? "",
      replies: [],
    };
  },
};

export const getApp = async () => {
  if (firebaseApp) {
    return firebaseApp;
  }
  firebaseApp = await initApp();
  return firebaseApp;
};

export const initApp = async () => {
  const config = {
    apiKey: FB_API_KEY,
    projectId: FB_PROJECT_ID,
  };
  const app = initializeApp(config);
  firebaseApp = app;
  return app;
};
export const getBlogPostByIdentifier = async (
  app: FirebaseApp,
  blogPostIdentifier: string
): Promise<Post | undefined> => {
  const db = getFirestore(app);
  if (location.hostname === "localhost") {
    console.log("LOCALHOST");

    connectFirestoreEmulator(db, "127.0.0.1", 8088);
  }

  const q = query(
    collection(db, sammlungName).withConverter(postConverter),
    where("blogPostIdentifier", "==", blogPostIdentifier)
  );
  const querySnapshot = await getDocs(q);

  const ref = querySnapshot.docs.at(0)?.ref;
  if (ref) {
    const doc = await getDoc(ref);

    const data = doc.data();
    return data;
  }
  return undefined;
};
export const getPostById = async (
  app: FirebaseApp,
  id: string
): Promise<Post | undefined> => {
  const db = getFirestore(app);
  const ref = doc(db, sammlungName, id).withConverter(postConverter);

  if (ref) {
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    return data;
  }
  return undefined;
};

export const savePost = async (
  app: FirebaseApp,
  blogPostIdentifier: string
) => {
  const db = getFirestore(app);

  const q = query(
    collection(db, sammlungName).withConverter(postConverter),
    where("blogPostIdentifier", "==", blogPostIdentifier)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    const post = { blogPostIdentifier: blogPostIdentifier, likes: 0 };
    const id = (await addDoc(collection(db, sammlungName), post)).id;
    return id;
  }
  return "0";
};

export const like = async (app: FirebaseApp, postID: string) => {
  const db = getFirestore(app);
  const post = await getPostById(app, postID);

  if (post) {
    post.likes++;
    const likes = post.likes;
    await setDoc(doc(db, "posts", postID), post);
    return likes;
  }
  return 0;
};

export const getComments = async (app: FirebaseApp, postId: string) => {
  const db = getFirestore(app);

  const q = query(
    collection(db, sammlungName, postId, "comments").withConverter(
      commentConverter
    ),
    orderBy("date")
  );

  const d = await getDocs(q);

  const comments: Array<Comment> = [];
  d.forEach((doc) => {
    comments.push(doc.data());
  });
  return comments;
};

export const addComment = async (
  app: FirebaseApp,
  postID: string,
  commentText: string,
  author: string
) => {
  const db = getFirestore(app);
  const nComment = {
    date: Date.now(),
    username: author,
    text: commentText,
  };
  await addDoc(collection(db, sammlungName, postID, "comments"), nComment);
};

export const addCommentReply = async (
  app: FirebaseApp,
  postID: string,
  parentCommentID: string,
  commentText: string,
  author: string
) => {
  const db = getFirestore(app);
  const nComment = {
    date: Date.now(),
    username: author,
    text: commentText,
    parentID: parentCommentID,
  };
  await addDoc(collection(db, sammlungName, postID, "comments"), nComment);
};
