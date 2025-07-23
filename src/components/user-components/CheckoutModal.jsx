import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { placeOrder } from "../../firebase/actions/orders";
import CheckoutForm from "./CheckoutForm";
import { cartActions } from "../../store/CartSlice";
import { useDispatch } from "react-redux";

export default function CheckoutModal({ isOpen, onClose, cartItems }) {
  const dispatch = useDispatch();

  async function handlePlaceOrder(orderData) {
    try {
      await placeOrder(orderData);

      dispatch(cartActions.clearCart());
      localStorage.removeItem("foodify_cart");

      onClose();
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="checkout-modal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center bg-black/50 bg-blend-darken transition justify-center"
          >
            <div
              className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">🧾 Checkout</h2>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>

              <CheckoutForm
                cartItems={cartItems}
                onSubmit={handlePlaceOrder}
                onCancel={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
}
