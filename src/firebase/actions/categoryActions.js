import { db } from "../config/firebase";
import { categoriesActions } from "../../store/CategoriesSlice";
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

export async function fetchCategories() {
  try {
    const snapshot = await getDocs(collection(db, "categories"));

    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    store.dispatch(categoriesActions.setCategories(categories));
  } catch (error) {
    console.error("Failed to fetch categories data", error);
  }
}

export async function addCategory(category) {
  try {
    const imageURL = await uploadImage(category.image, "categories");
    const docRef = await addDoc(collection(db, "categories"), {
      name: category.name,
      image: imageURL,
    });
    store.dispatch(
      categoriesActions.addCategory({
        id: docRef.id,
        name: category.name,
        image: imageURL,
      })
    );
  } catch (error) {
    console.error("Could not add category", error);
  }
}

export async function deleteCategory(id, imageURL) {
  try {
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
    store.dispatch(categoriesActions.removeCategory(id));

    const imagePath = getPathFromURL(imageURL);
    if (imagePath) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Could not delete category", error);
  }
}

export async function updateCategory(category) {
  try {
    let imageURL = category.image;
    let shouldDeleteOldImage = false;

    if (category.image instanceof File) {
      shouldDeleteOldImage = true;

      imageURL = await uploadImage(category.image, "categories");

      const oldRef = ref(storage, category.oldImagePath);
      await deleteObject(oldRef);
    }
    const docRef = doc(db, "categories", category.id);
    await updateDoc(docRef, {
      name: category.name,
      image: imageURL,
    });
    store.dispatch(
      categoriesActions.updateCategory({
        id: category.id,
        name: category.name,
        image: imageURL,
      })
    );
  } catch (error) {
    console.error("Could not update category", error);
  }
}
