import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../firebase/actions/itemActions";
import ItemList from "../../components/admin-components/ItemList";
import EditItemModal from "../../components/admin-components/EditItemModal";

export default function Items() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: null,
    image: null,
    categoryId: null,
  });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef();

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const categories = useSelector((state) => state.categories);

  async function handleAddItem(event) {
    event.preventDefault();
    setLoading(true);

    const newItem = {
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      image: item.image,
    };

    await addItem(newItem);

    setItem({
      name: "",
      price: "",
      image: null,
      description: "",
      categoryId: "",
    });
    imageInputRef.current.value = "";
    setLoading(false);
  }

  function handleRemoveItem(id) {
    removeItem(id);
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        <h2 className="text-2xl font-bold text-sky-700 text-center my-5">Manage Items</h2>
        {/* form div */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem]">
          <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
            Add Item
          </h2>

          <form onSubmit={handleAddItem}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={item.name}
                placeholder="e.g. Pizza Margheritta"
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={item.description}
                placeholder="description about the meal item"
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, description: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={item.price}
                placeholder="item's price"
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, price: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Category
              </label>
              <select
                id="category"
                value={item.categoryId}
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, categoryId: e.target.value }))
                }
                required
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
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={(e) =>
                  setItem((prev) => ({ ...prev, image: e.target.files[0] }))
                }
                required
                className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
              />
              {item.image && (
                <img
                  src={URL.createObjectURL(item.image)}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="hover:bg-green-600 hover:text-white px-4 py-2 rounded mt-4 bg-white text-sky-600 outline hover:outline-green-600 transition outline-sky-600"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        </div>

        <ItemList
          items={items}
          onDelete={handleRemoveItem}
          onEdit={setEditingItem}
        />
      </div>

      {/* edit category modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </>
  );
}
