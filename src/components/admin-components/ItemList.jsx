export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem] mt-20">
      <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
        Items
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">
          No items yet, add some to display them here.
        </p>
      ) : (
        <ul className="bg-white rounded shadow-xl/30 p-4 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <div className="flex justify-between items-start border-gray-300 border-b-2 pb-2">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{item.name}</span>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="font-medium text-sky-700">
                    ${item.price}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 py-1 px-3 rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 py-1 px-3 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
