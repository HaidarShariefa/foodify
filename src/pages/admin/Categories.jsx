import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesActions } from "../../store/CategoriesSlice";
import { nanoid } from "@reduxjs/toolkit";
import EditCategoryModal from "../../components/admin-components/EditCategoryModal";
import CategoryList from "../../components/admin-components/CategoryList";

export default function Categories() {
  const [category, setCategory] = useState({
    name: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  //add category fn
  function handleAddCategory(event) {
    event.preventDefault();

    dispatch(
      categoriesActions.addCategory({
        id: nanoid(),
        name: category.name,
        image: URL.createObjectURL(category.image),
      })
    );

    setCategory({ name: "", image: null });
    event.target.reset();
  }

  //remove category fn
  function handleRemoveCategory(id) {
    dispatch(categoriesActions.removeCategory(id));
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        {/* Form div */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem]">
          <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
            Add Category
          </h2>

          <form onSubmit={handleAddCategory}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={category.name}
                placeholder="e.g. Pizza"
                onChange={(e) =>
                  setCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCategory((prev) => ({ ...prev, image: e.target.files[0] }))
                }
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {category.image && (
                <img
                  src={URL.createObjectURL(category.image)}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>
            <button
              type="submit"
              className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded mt-4 bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Categories div */}
        <CategoryList
          categories={categories}
          onEdit={setEditingCategory}
          onDelete={handleRemoveCategory}
        />
      </div>

      {/* edit category modal */}
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={(updatedCategory) => {
            dispatch(categoriesActions.updateCategory(updatedCategory));
            setEditingCategory(null);
          }}
        />
      )}
    </>
  );
}
