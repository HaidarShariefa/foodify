import { useState } from "react";

export default function CheckoutForm({ cartItems, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();

    if (!name.trim() || !phone.trim()) return;

    onSubmit({
      customerName: name,
      phoneNumber: phone,
      notes,
      items: cartItems,
      createdAt: new Date().toISOString(),
    });
    setLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim() || !phone.trim()}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading? "Please Wait..." : "Place Order" }
        </button>
      </div>
    </form>
  );
}
