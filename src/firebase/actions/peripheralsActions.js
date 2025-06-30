import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadImage } from "../helpers/helpers";

const docRef = doc(db, "peripherals", "main");

export async function savePeripherals({ name, logoFile, bannerFile }) {
  try {
    let updates = { name };

    if (logoFile) {
      const logoURL = await uploadImage(logoFile, "peripherals");
      updates.logo = logoURL;
    }

    if (bannerFile) {
      const bannerURL = await uploadImage(bannerFile, "peripherals");
      updates.banner = bannerURL;
    }

    await setDoc(docRef, updates, { merge: true }); // merge = preserve old fields
  } catch (error) {
    console.error("Failed to save peripherals:", error);
  }
}

export async function fetchPeripherals() {
  try {
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Failed to fetch peripherals:", error);
    return null;
  }
}
