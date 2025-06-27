import { useState } from "react";
import { updateCategory } from "../../firebase/actions/categoryActions";

export default function EditCategoryModal({ category, onClose }) {
  const [name, setName] = useState(category.name);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(category.image);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const updatedCategory = {
      id: category.id,
      name,
      image: image || preview,
      oldImagePath: category.image
    };

    await updateCategory(updatedCategory);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-gray-50 text-sky-600 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 w-[80%] max-w-[40rem] animate-fade-slide-up">
        <h2 className="text-lg font-semibold text-sky-700 mb-4 text-center">
          Edit Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-3 py-2 rounded"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 mt-2 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 py-1 px-3 rounded transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 py-1 px-3 rounded transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
