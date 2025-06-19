import { db } from "../config/firebase";
import { categoriesActions } from "../CategoriesSlice";
import { collection, getDocs } from "firebase/firestore";

export async function fetchCategories(dispatch) {
  try {
    const snapshot = await getDocs(collection(db, "categories"));

    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(categoriesActions.setCategories(categories));
  } catch (error) {
    console.error("Failed to fetch categories data", error);
  }
}
