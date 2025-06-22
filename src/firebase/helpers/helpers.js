import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadImage(file, folder = "images") {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
}

export function getPathFromURL(url) {
  const decoded = decodeURIComponent(url);
  const matches = decoded.match(/\/o\/(.*?)\?alt/);
  return matches ? matches[1] : null;
}
