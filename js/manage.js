
import { db } from "./firebase-config.js";
import {
  collection, getDocs, addDoc, doc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const serviceForm = document.getElementById("serviceForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const statusMsg = document.getElementById("statusMsg");
const servicesContainer = document.getElementById("servicesContainer");

async function loadServices() {
  try {
    const querySnapshot = await getDocs(collection(db, "services"));
    console.log(" Existing services loaded:", querySnapshot.size);

    let html = "";
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      html += `
        <div class="service-card">
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <button onclick="editService('${docSnap.id}', '${data.title}', \`${data.description}\`)">Edit</button>
          <button onclick="deleteService('${docSnap.id}')">Delete</button>
        </div>
      `;
    });

    servicesContainer.innerHTML = html;
  } catch (err) {
    console.error(" Failed to load services:", err.message);
  }
}

serviceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const description = descInput.value;

  try {
    const docRef = await addDoc(collection(db, "services"), { title, description });
    console.log(" New service added:", { id: docRef.id, title });
    statusMsg.textContent = "Service added successfully!";
    serviceForm.reset();
    loadServices();
  } catch (err) {
    console.error(" Failed to add service:", err.message);
    statusMsg.textContent = "Error adding service.";
  }
});

window.editService = function (id, title, description) {
  titleInput.value = title;
  descInput.value = description;

  serviceForm.onsubmit = async function (e) {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "services", id), {
        title: titleInput.value,
        description: descInput.value
      });
      console.log(" Service updated:", { id, title: titleInput.value });
      statusMsg.textContent = "Service updated.";
      serviceForm.reset();
      loadServices();
    } catch (err) {
      console.error(" Error updating service:", err.message);
      statusMsg.textContent = "Error updating service.";
    }
    serviceForm.onsubmit = defaultSubmitHandler; // reset to default
  };
};

window.deleteService = async function (id) {
  try {
    await deleteDoc(doc(db, "services", id));
    console.log(" Service deleted:", id);
    loadServices();
  } catch (err) {
    console.error(" Failed to delete service:", err.message);
    alert("Delete failed.");
  }
};

const defaultSubmitHandler = serviceForm.onsubmit;
loadServices();
