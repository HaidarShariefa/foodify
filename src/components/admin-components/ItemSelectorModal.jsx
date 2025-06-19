import { useState } from "react";

export default function ItemSelectorModal({
  items,
  categories,
  selectedItemIds,
  onClose,
  onSave,
}) {
  const [selected, setSelected] = useState(selectedItemIds || []);

  function toggleItem(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    // ⬅️ Backdrop
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* ⬅️ Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto space-y-6">
        {/* ⬅️ Header */}
        <div>
          <h2 className="text-xl font-semibold text-center text-white bg-sky-600 rounded-md">
            Select Items
          </h2>
        </div>

        {/* ⬅️ Category/Item Listing */}
        <div className="space-y-4">
          {categories.map((category) => {
            const itemsInCategory = items.filter(
              (item) => item.categoryId === category.id
            );

            if (itemsInCategory.length === 0) return null;

            return (
              <div key={category.id} className="border-2 p-2 rounded-md border-gray-400">
                <div>
                  <h3 className="text-lg font-medium text-sky-600 mb-2">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {itemsInCategory.map((item) => (
                    <li key={item.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ⬅️ Footer (buttons) */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-red-100 text-red-600 hover:bg-red-200 py-1 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selected)}
            className="bg-sky-100 text-sky-700 hover:bg-sky-200 py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
