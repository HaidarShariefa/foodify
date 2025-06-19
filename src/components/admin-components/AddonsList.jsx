export default function AddonsList({ addons, onEdit, onDelete }) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem] mt-20">
      <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
        Addons
      </h2>
      {addons.length === 0 ? (
        <p className="text-gray-500">
          No Addons yet, add some to display them here.
        </p>
      ) : (
        <ul className="bg-white rounded shadow-xl/30 p-4 space-y-2">
          {addons.map((addon) => (
            <li key={addon.id}>
              <div className="flex items-center justify-between border-gray-300 border-b-2 pb-2">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">{addon.name}</span>
                </div>
                <div className="space-x-2">
                  <span>${addon.price}</span>
                  <button
                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 py-1 px-3 rounded transition"
                    onClick={() => onEdit(addon)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 py-1 px-3 rounded transition"
                    onClick={() => onDelete(addon.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
