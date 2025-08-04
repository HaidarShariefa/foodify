import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { uploadImage } from "../helpers/helpers";

const docRef = doc(db, "settings", "main");

export async function saveSettings({
  name,
  address,
  phone,
  email,
  facebook,
  instagram,
  whatsapp,
  logoFile,
  bannerFile,
}) {
  try {
    let updates = {
      name,
      address,
      phone,
      email,
      facebook,
      instagram,
      whatsapp,
    };

    if (logoFile) {
      const logoURL = await uploadImage(logoFile, "settings");
      updates.logo = logoURL;
    }

    if (bannerFile) {
      const bannerURL = await uploadImage(bannerFile, "settings");
      updates.banner = bannerURL;
    }

    await setDoc(docRef, updates, { merge: true });
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

export async function fetchSettings() {
  try {
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}
