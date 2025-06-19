import { useSelector } from "react-redux";

export default function FullMenu() {
  const categories = useSelector((state) => state.categories);
  const items = useSelector((state) => state.items);
  const addons = useSelector((state) => state.addons);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-sky-700 text-center">Full Menu</h2>
      {categories.length === 0 && (
        <h3 className="text-center mt-30 text-3xl">Nothing here yet!</h3>
      )}
      {categories.map((category) => {
        const itemsOfCategory = items.filter(
          (item) => item.categoryId === category.id
        );

        return (
          <div key={category.id} className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-xl font-semibold text-sky-600 mb-3 border-b-2">
              {category.name}
            </h3>
            {itemsOfCategory.length === 0 && <h3>Nothing here yet</h3>}
            <ul className="space-y-2">
              {itemsOfCategory.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b-1 border-gray-400 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sky-700 font-medium">
                    ${item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-xl font-semibold text-sky-600 mb-3 border-b-2">
          Addons
        </h3>
        <ul>
          {addons.length === 0 && <h3>Nothing here yet</h3>}
          {addons.map((addon) => (
            <li
              key={addon.id}
              className="flex items-center justify-between border-b-1 border-gray-400 py-4"
            >
              <div className="flex items-center gap-4">
                <span>{addon.name}</span>
              </div>
              <span className="text-sky-700 font-medium">${addon.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
