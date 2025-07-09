import { db } from "../config/firebase";
import { itemActions } from "../../store/ItemsSlice";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { uploadImage, getPathFromURL } from "../helpers/helpers";
import store from "../../store/store";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";

export async function fetchItems() {
  try {
    const snapshot = await getDocs(collection(db, "items"));

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    store.dispatch(itemActions.setItems(items));
  } catch (error) {
    console.error("Failed to fetch items data", error);
  }
}

export async function addItem(item) {
  try {
    const imageURL = await uploadImage(item.image, "items");
    const docRef = await addDoc(collection(db, "items"), {
      name: item.name,
      description: item.description,
      price: Number(item.price),
      categoryId: item.categoryId,
      image: imageURL,
    });
    store.dispatch(
      itemActions.addItem({
        id: docRef.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        categoryId: item.categoryId,
        image: imageURL,
      })
    );
  } catch (error) {
    console.error("Could not fetch items data", error);
  }
}

export async function removeItem(id, imageURL) {
  try {
    const docRef = doc(db, "items", id);
    await deleteDoc(docRef);
    store.dispatch(itemActions.removeItem(id));

    const imagePath = getPathFromURL(imageURL);
    if (imagePath) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Could not delete item", error);
  }
}

export async function updateItem(item) {
  try {
    let imageURL = item.image;

    if (item.image instanceof File) {
      imageURL = await uploadImage(item.image, "items");

      if (item.oldImagePath) {
        const oldRef = ref(storage, item.oldImagePath);
        await deleteObject(oldRef);
      }
    }
    const docRef = doc(db, "items", item.id);
    await updateDoc(docRef, {
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      image: imageURL,
    });
    store.dispatch(
      itemActions.updateItem({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        categoryId: item.categoryId,
        image: imageURL,
      })
    );
  } catch (error) {
    console.error("Could not update item", error);
  }
}
