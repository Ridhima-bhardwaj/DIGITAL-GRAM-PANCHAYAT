
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyBBR1w7BElb_JNIHS-EYCX_yO8HUsaG73s",
  authDomain: "digitalgrampanchayat-96798.firebaseapp.com",
  projectId: "digitalgrampanchayat-96798",
  storageBucket: "digitalgrampanchayat-96798.appspot.com",  
  messagingSenderId: "988198431413",
  appId: "1:988198431413:web:56839a11363689f023acfc"
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in auth.js
export { auth, db, storage };
