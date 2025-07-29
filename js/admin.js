import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const form = document.getElementById("serviceForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) {
    statusMsg.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "services"), {
      title,
      description,
    });

    console.log("✅ Service added:", docRef.id);
    statusMsg.textContent = "✅ Service submitted successfully!";
    form.reset();
  } catch (err) {
    console.error("❌ Error adding service:", err.message);
    statusMsg.textContent = "❌ Failed to submit service.";
  }
});
