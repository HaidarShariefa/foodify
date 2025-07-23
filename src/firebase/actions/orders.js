import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export async function placeOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (err) {
    console.error("Error placing order:", err);
    throw err;
  }
}
