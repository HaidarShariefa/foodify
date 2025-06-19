import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addonActions } from "../../store/AddonsSlice";
import { nanoid } from "@reduxjs/toolkit";
import AddonsList from "../../components/admin-components/AddonsList";
import EditAddonModal from "../../components/admin-components/EditAddonModal";
import ItemSelectorModal from "../../components/admin-components/ItemSelectorModal";

export default function Addons() {
  const [addon, setAddon] = useState({
    name: "",
    price: null,
    linkedItemsIds: [],
  });

  const [editingAddon, setEditingAddon] = useState(null);

  const [showItemSelector, setShowItemSelector] = useState(false);

  const dispatch = useDispatch();

  const addons = useSelector((state) => state.addons);
  const items = useSelector((state) => state.items);
  const categories = useSelector((state) => state.categories);

  function handleAddAddon(event) {
    event.preventDefault();

    dispatch(
      addonActions.addAddon({
        id: nanoid(),
        name: addon.name,
        price: Number(addon.price),
        linkedItemsIds: addon.linkedItemsIds,
      })
    );

    setAddon({
      name: "",
      price: '',
      linkedItemsIds: [],
    });
  }

  function handleRemoveAddon(id) {
    dispatch(addonActions.removeAddon(id));
  }

  function handleLinkedItemsChange(e) {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setAddon((prev) => ({ ...prev, linkedItemIds: selectedOptions }));
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center">
        {/* form div */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem]">
          <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
            Add Addon
          </h2>

          <form onSubmit={handleAddAddon}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={addon.name}
                placeholder="e.g. Pepperoni"
                onChange={(e) =>
                  setAddon((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={addon.price}
                placeholder="addon's price"
                onChange={(e) =>
                  setAddon((prev) => ({ ...prev, price: e.target.value }))
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
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
                Select Linked Items ({addon.linkedItemsIds.length})
              </button>
            </div>

            <button
              type="submit"
              className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded mt-4 bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
            >
              Add Addon
            </button>
          </form>
        </div>

        <AddonsList
          addons={addons}
          onEdit={setEditingAddon}
          onDelete={handleRemoveAddon}
        />
      </div>

      {editingAddon && (
        <EditAddonModal
          addon={editingAddon}
          onClose={() => setEditingAddon(null)}
          onSave={(updatedAddon) => {
            dispatch(addonActions.updateAddon(updatedAddon));
            setEditingAddon(null);
          }}
        />
      )}

      {showItemSelector && (
        <ItemSelectorModal
          items={items}
          categories={categories}
          selectedItemIds={addon.linkedItemsIds}
          onClose={() => setShowItemSelector(false)}
          onSave={(selectedIds) => {
            setAddon((prev) => ({ ...prev, linkedItemsIds: selectedIds }));
            setShowItemSelector(false);
          }}
        />
      )}
    </>
  );
}
