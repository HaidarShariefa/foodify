import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchItems } from "../../firebase/actions/itemActions";
import { fetchAddons } from "../../firebase/actions/addonActions";
import AddonSelectionModal from "./AddonSelectionModal";

export default function Items({ categories }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useSelector((state) => state.items);
  const addons = useSelector((state) => state.addons);

  useEffect(() => {
    fetchItems();
    fetchAddons();
  }, []);

  return (
    <>
      <AddonSelectionModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        addons={addons}
      />
      <div className="w-full max-w-4xl mx-auto px-4 space-y-8 py-8">
        {categories.map((cat) => {
          const filteredItems = items.filter(
            (item) => item.categoryId === cat.id
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={cat.id} id={`category-${cat.id}`}>
              {/* Category Title */}
              <h2 className="text-2xl text-white font-semibold mb-4">
                {cat.name}
              </h2>

              {/* Items List */}
              <ul className="space-y-2">
                {filteredItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start bg-white rounded-xl shadow-sm p-4"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 flex-shrink-0 mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Text Section */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-sky-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-sky-600 font-medium mb-1">
                        ${item.price}
                      </p>
                      <p className="text-gray-600 text-sm break-words">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to Cart */}
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-sky-600 text-2xl hover:text-sky-800 transition"
                      >
                        <FontAwesomeIcon icon={faCartPlus} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <div id="category-addons" className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl text-white font-semibold mb-4">Addons</h2>

          <ul className="space-y-2">
            {addons.map((addon) => (
              <li
                key={addon.id}
                className="flex items-start bg-white rounded-xl shadow-sm p-4"
              >
                {/* Text Info */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-sky-800">
                    {addon.name}
                  </h3>
                  <p className="text-sm text-sky-600 font-medium mb-1">
                    ${addon.price}
                  </p>
                  {addon.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {addon.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
