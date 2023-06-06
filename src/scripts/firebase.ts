interface Comment {
  id: string;
  postID?: string;
  date: Date;
  formattedDate?: string;
  username: string;
  text: string;
  // path: string;
  parentID?: string;
  replies?: Comment[];
}

interface Post {
  id: string;
  blogPostIdentifier: string;
  likes: number;
}

let firebaseApp: FirebaseApp | undefined;

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
      username: comment.username,
      text: comment.text,
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
      username: data.username ?? "anonymous",
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
    apiKey: "AIzaSyCL_EGEdWUO8Q4bSsZJtikBUZ029KnbgN0",
    projectId: "my-blog-42",
  };

  let { initializeApp } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
  );
  let { getAuth, signInAnonymously } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js"
  );

  const app = initializeApp(config);
  const auth = getAuth();
  await signInAnonymously(auth);
  firebaseApp = app;
  return app;
};
export const getBlogPostByIdentifier = async (
  app: FirebaseApp,
  blogPostIdentifier: string
): Promise<Post | undefined> => {
  let { getFirestore, collection, getDocs, query, where, getDoc } =
    await import(
      "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
    );
  const db = getFirestore(app);

  const q = query(
    collection(db, "posts").withConverter(postConverter),
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
  let { getFirestore, doc, getDoc } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
  );
  if (!firebaseApp) {
    firebaseApp = await initApp();
  }
  const db = getFirestore(firebaseApp);
  const ref = doc(db, "posts", id).withConverter(postConverter);

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
  let { getFirestore, collection, getDocs, query, where, addDoc } =
    await import(
      "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
    );
  if (!firebaseApp) {
    firebaseApp = await initApp();
  }
  const db = getFirestore(firebaseApp);

  const q = query(
    collection(db, "posts").withConverter(postConverter),
    where("blogPostIdentifier", "==", blogPostIdentifier)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    const post = { blogPostIdentifier: blogPostIdentifier, likes: 0 };
    const id = (await addDoc(collection(db, "posts"), post)).id;
    return id;
  }
  return "0";
};

export const like = async (app: FirebaseApp, postID: string) => {
  let { getFirestore, doc, setDoc } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
  );
  if (!firebaseApp) {
    await initApp();
  }
  const db = getFirestore(app);
  const post = await getPostById(app, postID);

  if (post) {
    post.likes++;
    const likes = post.likes;
    await setDoc(doc(db, "posts", postID), post);
    return likes;
  }

  // await addDoc(collection(db, "posts"), { title: title, likes: 1 });
  return 0;
};

export const getComments = async (app: FirebaseApp, postId: string) => {
  let { getFirestore, collection, getDocs, query, orderBy } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
  );
  const db = getFirestore(app);

  const q = query(
    collection(db, "posts", postId, "comments").withConverter(commentConverter),
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
  let { getFirestore, collection, addDoc } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
  );
  const db = getFirestore(app);
  const nComment = {
    date: Date.now(),
    username: author,
    text: commentText,
  };
  await addDoc(collection(db, "posts", postID, "comments"), nComment);
};

export const addCommentReply = async (
  app: FirebaseApp,
  postID: string,
  parentCommentID: string,
  commentText: string,
  author: string
) => {
  let { getFirestore, collection, addDoc } = await import(
    "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js"
  );
  const db = getFirestore(app);
  const nComment = {
    date: Date.now(),
    username: author,
    text: commentText,
    parentID: parentCommentID,
  };
  await addDoc(collection(db, "posts", postID, "comments"), nComment);
};

export const getCommentsWithReplies = async (
  app: FirebaseApp,
  postID: string
) => {
  // Rufe die getComments-Funktion auf
  const comments = await getComments(app, postID);

  // Rekursive Funktion zum Hinzufügen von Antworten zu Kommentaren
  function addReplies(comments: Comment[]) {
    comments.forEach((comment) => {
      // Finde alle Antworten auf diesen Kommentar
      const replies = comments.filter((c) => c.parentID === comment.id);

      // Füge die Antworten zum Kommentar hinzu
      if (replies.length > 0) {
        comment.replies = replies;

        // Rufe die Funktion rekursiv für die Antworten auf
        addReplies(replies);
      }
    });
  }

  // Rufe die rekursive Funktion auf
  addReplies(comments);

  // Filtere die Liste, um nur Kommentare ohne Eltern zurückzugeben
  const topLevelComments = comments.filter((comment) => !comment.parentID);

  return topLevelComments;
};
