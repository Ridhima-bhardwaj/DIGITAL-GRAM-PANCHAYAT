
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Load all services posted by officer/admin
async function loadServices() {
  const serviceDiv = document.getElementById("serviceList");
  serviceDiv.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "services"));

    if (snapshot.empty) {
      serviceDiv.innerHTML = "<p class='en'>No services found.</p><p class='hi' style='display:none;'>कोई सेवाएं नहीं मिलीं।</p>";
      return;
    }

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const container = document.createElement("div");
      container.className = "card";

      container.innerHTML = `
        <h4>${data.title}</h4>
        <p>${data.description}</p>
        ${data.date ? `<small>Posted on: ${data.date}</small>` : ""}
      `;

      serviceDiv.appendChild(container);
    });
  } catch (err) {
    serviceDiv.innerHTML = `<p>Error loading services: ${err.message}</p>`;
  }
}

// Run on load
loadServices();
