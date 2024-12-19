import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, remove, update, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDenkL80nmSDgxp0GbjqjpOwJc__MaDeeI",
  authDomain: "quizapp00-82265.firebaseapp.com",
  databaseURL: "https://quizapp00-82265-default-rtdb.firebaseio.com",
  projectId: "quizapp00-82265",
  storageBucket: "quizapp00-82265.firebasestorage.app",
  messagingSenderId: "1041580926791",
  appId: "1:1041580926791:web:5600eb1f7812e92ced4e62"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Export Firebase Functions
export { ref, push, remove, update, onValue };