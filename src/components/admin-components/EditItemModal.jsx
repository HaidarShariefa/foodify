import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditItemModal({ item, onClose, onSave }) {
  const [name, setName] = useState(item.name);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [preview, setPreview] = useState(item.image);

  const categories = useSelector((state) => state.categories);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      id: item.id,
      name,
      description,
      price,
      image: image ? URL.createObjectURL(image) : preview,
      categoryId,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-gray-50 text-sky-600 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 w-[80%] max-w-[40rem] animate-fade-slide-up">
        <h2 className="text-lg font-semibold text-sky-700 mb-4 text-center">
          Edit Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Category
            </label>
            <select
              id="category"
              value={categoryId}
              className="w-full border border-sky-600 rounded px-3 py-2 placeholder:text-gray mb-2"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
