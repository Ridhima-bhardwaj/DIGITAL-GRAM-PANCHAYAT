
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

import {
  doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Register Function
window.register = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  console.log(" Registering user...", { name, email, role });

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      role: role
    });

    console.log(" Registration successful:", { uid, email, role });
    alert("Registered successfully!");

    if (role === "user") {
      window.location.href = "user-dashboard.html";
    } else {
      window.location.href = "officer-dashboard.html";
    }

  } catch (err) {
    console.error(" Registration Error:", err.message);
    alert("Registration Error: " + err.message);
  }
};

//  Login Function
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;

  console.log(" Login attempt:", email);

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;

    console.log(" Firebase Auth Success. UID:", uid);

    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      console.warn("⚠ No user record found in Firestore.");
      alert("No user record found in database.");
      return;
    }

    const role = userDoc.data().role;
    console.log(" User role found:", role);
    alert("Login successful!");

    if (role === "user") {
      window.location.href = "user-dashboard.html";
    } else if (role === "staff") {
      window.location.href = "staff-dashboard.html";
    } else if (role === "officer") {
      window.location.href = "officer-dashboard.html";
    } else {
      console.warn(" Unknown user role:", role);
      alert("Unknown role. Please contact admin.");
    }

  } catch (err) {
    console.error(" Login Error:", err.message);
    alert("Login Error: " + err.message);
  }
};
