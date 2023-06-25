declare module "https://*";
declare module "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-lite.js" {
  export {
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
  } from "firebase/firestore/lite";
}
declare module "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js" {
  export { FirebaseApp, initializeApp } from "firebase/app";
}
declare module "https://esm.sh/canvas-confetti" {
  export { default } from "canvas-confetti";
}
