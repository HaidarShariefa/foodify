import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadImage(file, folder = "images") {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}

export function getPathFromURL(url) {
  try {
    const decoded = decodeURIComponent(url);
    const startIndex = decoded.indexOf("/o/") + 3;
    const endIndex = decoded.indexOf("?alt=");
    return decoded.slice(startIndex, endIndex);
  } catch {
    return null;
  }
}

