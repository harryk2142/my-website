import { FirebaseApp as _FirebaseApp } from "@firebase/app";
import { Firestore as _Firestore } from "@firebase/firestore";
import { Auth as _Auth } from "@firebase/auth";

import * as firebase from "@firebase/app-types";
import * as firestore from "@firebase/firestore";
import * as auth from "@firebase/auth";
import * as _confetti from "@types/canvas-confetti";

declare module "https://*";
declare module "*";
export {};

declare global {
  interface FirebaseApp extends _FirebaseApp {}
  interface Firestore extends _Firestore {}
  interface Auth extends _Auth {}
}
