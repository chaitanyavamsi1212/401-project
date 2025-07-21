// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyDltQfshvwupE20puyWyQYZAGBdtt51his",
  authDomain: "campus-event-3e425.firebaseapp.com",
  databaseURL: "https://campus-event-3e425-default-rtdb.firebaseio.com",
  projectId: "campus-event-3e425",
  storageBucket: "campus-event-3e425.appspot.com",
  messagingSenderId: "309211433587",
  appId: "1:309211433587:web:cc971c84fc5bf401997806",
  measurementId: "G-9KVQV2C1TX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export them so other modules can use
export { auth, db };
