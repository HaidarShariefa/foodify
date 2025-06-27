import { db } from "../config/firebase";
import { addonActions } from "../../store/AddonsSlice";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import store from "../../store/store";

export async function fetchAddons() {
  try {
    const snapshot = await getDocs(collection(db, "addons"));

    const addons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    store.dispatch(addonActions.setAddons(items));
  } catch (error) {
    console.error("Could not fetch addons", error);
  }
}

export async function addAddon(addon) {
  try {
    const docRef = await addDoc(collection(db, "addons"), {
      name: addon.name,
      price: addon.price,
      linkedItemsIds: addon.linkedItemsIds,
    });
    store.dispatch(
      addonActions.addAddon({
        id: docRef.id,
        name: addon.name,
        price: addon.price,
        linkedItemsIds: addon.linkedItemsIds,
      })
    );
  } catch (error) {
    console.error("Could not add addon", error);
  }
}

export async function removeAddon(id) {
  try {
    const docRef = doc(db, "addons", id);
    await deleteDoc(docRef);
    store.dispatch(addonActions.removeAddon(id));
  } catch (error) {
    console.error("Could not delete addon", error);
  }
}

export async function updateAddon(addon) {
  try {
    const docRef = doc(db, "addons", addon.id);
    await updateDoc(docRef, {
      id: addon.id,
      name: addon.name,
      price: addon.price,
      linkedItemsIds: addon.linkedItemsIds,
    });
    store.dispatch(
      addonActions.updateAddon({
        id: docRef.id,
        name: addon.name,
        price: addon.price,
        linkedItemsIds: addon.linkedItemsIds,
      })
    );
  } catch (error) {
    console.error("Could not update addon", error);
  }
}
