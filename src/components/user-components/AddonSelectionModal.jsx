import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice"; // update the path if needed

export default function AddonSelectionModal({ isOpen, onClose, item, addons }) {
  const dispatch = useDispatch();
  const [filteredAddons, setFilteredAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Filter addons linked to this item
  useEffect(() => {
    if (!item || !addons) return;

    const linkedAddons = addons
      .filter((addon) => addon.linkedItemsIds?.includes(item.id))
      .map((addon) => ({
        ...addon,
        quantity: 1,
        selected: false,
      }));

    setFilteredAddons(linkedAddons);
  }, [item, addons]);

  // Calculate price of selected addons
  const addonsPrice = filteredAddons.reduce((sum, addon) => {
    if (addon.selected) {
      return sum + addon.price * addon.quantity;
    }
    return sum;
  }, 0);

  const totalPrice = Number(item?.price || 0) + addonsPrice;

  const handleAddToCart = () => {
    const selectedAddons = filteredAddons
      .filter((addon) => addon.selected)
      .map((addon) => ({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        quantity: addon.quantity,
      }));

    dispatch(
      cartActions.addItemToCart({
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image || "",
        basePrice: Number(item.price),
        selectedAddons,
        quantity,
      })
    );

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">
                Base Price: ${(+item.price).toFixed(2)}
              </p>

              {/* Addons */}
              {filteredAddons.length === 0 ? (
                <p className="text-gray-500 mb-4">
                  No addons available for this item.
                </p>
              ) : (
                <div className="space-y-4 mb-4">
                  {filteredAddons.map((addon, index) => (
                    <label key={addon.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-green-600"
                        checked={addon.selected}
                        onChange={(e) => {
                          const updated = [...filteredAddons];
                          updated[index].selected = e.target.checked;
                          setFilteredAddons(updated);
                        }}
                      />
                      <span>
                        {addon.name} (+${Number(addon.price).toFixed(2)})
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Total Price */}
              <p className="font-semibold text-lg mb-4">
                Total: ${totalPrice.toFixed(2)}
              </p>
              {/* Quantity */}
              <div className="flex items-center justify-start gap-4 mb-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={onClose}
                  className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
