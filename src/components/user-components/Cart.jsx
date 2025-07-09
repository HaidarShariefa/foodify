import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Cart({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 backdrop-blur-sm ${
          isOpen ? "bg-blend-darken" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* DESKTOP */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-lg
          hidden sm:block transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <CartContent onClose={onClose}>{children}</CartContent>
      </div>

      {/* MOBILE */}
      <div
        className={`
          fixed bottom-0 left-0 w-full h-[65vh] overflow-y-auto bg-white rounded-t-xl z-50 shadow-lg
          sm:hidden transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <CartContent onClose={onClose}>{children}</CartContent>
      </div>
    </>
  );
}

function CartContent({ onClose }) {
  const cartItems = useSelector((state) => state.cart);
  const allItems = useSelector((state) => state.items);
  const allAddons = useSelector((state) => state.addons);

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🛒 Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((cartItem) => {
            const item = allItems.find((i) => i.id === cartItem.itemId);
            const addons = cartItem.selectedAddons.map((addonId) =>
              allAddons.find((a) => a.id === addonId)
            );

            const itemPrice = Number(item?.price || 0);
            const addonsTotal = addons.reduce(
              (sum, a) => sum + Number(a?.price || 0),
              0
            );
            const itemTotal = itemPrice + addonsTotal;
            const total = itemTotal * cartItem.quantity;

            return (
              <div
                key={cartItem.id}
                className="flex items-start justify-between border-b pb-3"
              >
                <div>
                  <h4 className="font-semibold">{item?.name}</h4>
                  {addons.length > 0 && (
                    <ul className="text-sm text-gray-500 ml-2">
                      {addons.map((addon) => (
                        <li key={addon?.id}>+ {addon?.name}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-sm mt-1">Qty: {cartItem.quantity}</p>
                </div>
                <div className="text-right font-medium">
                  ${total.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
