// import firebase from "firebase/app";
// import "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "API Key",
  authDomain: "certificataseapp.com",
  projectId: "certificate-f66",
  storageBucket: "certificate-2cf66.appspot.com",
  messagingSenderId: "8593778",
  appId: "c080864bf2f24f6e01e8b"
};
// const app = initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

// export { storage, firebase as default };
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
