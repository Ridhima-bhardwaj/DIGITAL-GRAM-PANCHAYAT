import { db, auth } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// 🔒 Protect page
function protectPage(requiredRole) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return window.location.href = "login.html";

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().role !== requiredRole) {
      alert("Access denied.");
      window.location.href = "login.html";
    } else {
      loadComplaints(user.uid);
    }
  });
}

protectPage("user");

const complaintForm = document.getElementById("complaintForm");
const complaintList = document.getElementById("complaintList");
const statusMsg = document.getElementById("statusMsg");

complaintForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    await addDoc(collection(db, "complaints"), {
      userId: user.uid,
      category,
      description,
      status: "Pending",
      response: ""
    });

    statusMsg.textContent = "Complaint submitted successfully.";
    complaintForm.reset();
    loadComplaints(user.uid);

  } catch (err) {
    statusMsg.textContent = "Failed to submit complaint.";
  }
});

async function loadComplaints(uid) {
  try {
    const querySnapshot = await getDocs(collection(db, "complaints"));

    let html = "";
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.userId === uid) {
        html += `
          <div class="complaint-card">
            <p><strong>Category:</strong> ${data.category}</p>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Response:</strong> ${data.response || "N/A"}</p>
          </div>
        `;
      }
    });

    complaintList.innerHTML = html;
  } catch (err) {
    complaintList.innerHTML = "<p>Error loading complaints.</p>";
  }
}

// 🔒 Logout
window.logout = function () {
  if (confirm("Are you sure you want to logout?")) {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  }
};
