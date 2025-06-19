import { useState } from "react";
import { useSelector } from "react-redux";

import ItemSelectorModal from "./ItemSelectorModal";

export default function EditAddonModal({ addon, onClose, onSave }) {
  const [name, setName] = useState(addon.name);
  const [price, setPrice] = useState(addon.price);
  const [linkedItemsIds, setLinkedItemsIds] = useState(
    addon.linkedItemsIds || []
  );
  const [showItemSelector, setShowItemSelector] = useState(false);

  const items = useSelector((state) => state.items);
  const categories = useSelector((state) => state.categories);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      id: addon.id,
      name,
      price: Number(price),
      linkedItemsIds: linkedItemsIds,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-gray-50 text-sky-600 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] p-4 w-[80%] max-w-[40rem] animate-fade-slide-up">
        <h2 className="text-lg font-semibold text-sky-700 mb-4 text-center">
          Edit Addon
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
              Relative Items
            </label>
            <button
              type="button"
              onClick={() => setShowItemSelector(true)}
              className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
            >
              Select Linked Items ({linkedItemsIds.length})
              {linkedItemsIds.length > 0 && (
                <ul className="mt-2 text-sm list-disc list-inside">
                  {items
                    .filter((item) => linkedItemsIds.includes(item.id))
                    .map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
              )}
            </button>
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
      {showItemSelector && (
        <ItemSelectorModal
          items={items}
          categories={categories}
          selectedItemIds={linkedItemsIds}
          onClose={() => setShowItemSelector(false)}
          onSave={(selectedIds) => {
            setLinkedItemsIds(selectedIds);
            setShowItemSelector(false);
          }}
        />
      )}
    </div>
  );
}
