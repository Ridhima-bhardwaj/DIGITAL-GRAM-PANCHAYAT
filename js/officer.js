import { db, auth } from "./firebase-config.js";
import {
  collection, getDocs, doc, updateDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
  onAuthStateChanged
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
      loadComplaints();
    }
  });
}

protectPage("officer");

const complaintList = document.getElementById("complaintList");

async function loadComplaints() {
  try {
    const querySnapshot = await getDocs(collection(db, "complaints"));

    let html = "";
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      html += `
        <div class="complaint-card">
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Status:</strong> ${data.status || "Pending"}</p>
          <p><strong>Response:</strong> ${data.response || "N/A"}</p>
          <textarea id="response-${docSnap.id}" placeholder="Write response here..."></textarea>
          <select id="status-${docSnap.id}">
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button onclick="updateComplaint('${docSnap.id}')">Update</button>
        </div>
      `;
    });

    complaintList.innerHTML = html;
  } catch (err) {
    console.error(" Error loading complaints:", err.message);
  }
}

window.updateComplaint = async function (id) {
  const response = document.getElementById(`response-${id}`).value;
  const status = document.getElementById(`status-${id}`).value;

  try {
    await updateDoc(doc(db, "complaints", id), {
      response,
      status
    });
    alert("Complaint updated successfully!");
    loadComplaints();
  } catch (err) {
    alert("Error updating complaint.");
  }
};
