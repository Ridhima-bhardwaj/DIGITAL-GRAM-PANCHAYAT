import { auth, db } from "./firebase-config.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const profileInfo = document.getElementById("profileInfo");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.warn("No authenticated user. Redirecting to login.");
    window.location.href = "login.html";
    return;
  }

  const uid = user.uid;
  console.log(" Authenticated user:", user.email);

  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.data();

    console.log(" Profile data loaded:", userData);

    profileInfo.innerHTML = `
      <p class="en"><strong>Name:</strong> ${userData.name}</p>
      <p class="hi" style="display:none;"><strong>नाम:</strong> ${userData.name}</p>

      <p class="en"><strong>Email:</strong> ${userData.email}</p>
      <p class="hi" style="display:none;"><strong>ईमेल:</strong> ${userData.email}</p>

      <p class="en"><strong>Role:</strong> ${userData.role}</p>
      <p class="hi" style="display:none;"><strong>भूमिका:</strong> ${userData.role}</p>
    `;
  } catch (err) {
    console.error(" Error loading profile:", err.message);
    profileInfo.innerHTML = `
      <p class="en">Error loading profile: ${err.message}</p>
      <p class="hi" style="display:none;">प्रोफ़ाइल लोड करने में त्रुटि: ${err.message}</p>`;
  }
});

// Logout handler
window.logout = function () {
  signOut(auth)
    .then(() => {
      console.log(" User logged out successfully.");
      window.location.href = "login.html";
    })
    .catch((err) => {
      console.error(" Logout failed:", err.message);
    });
};
