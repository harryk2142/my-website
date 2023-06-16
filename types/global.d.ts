declare module "https://*";
declare module "https://esm.sh/firebase/firestore/lite" {
  export {
    addDoc,
    collection,
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
declare module "https://esm.sh/firebase/app" {
  export { FirebaseApp, initializeApp } from "firebase/app";
}
declare module "https://esm.sh/canvas-confetti" {
  export { default } from "canvas-confetti";
}
// export {};
