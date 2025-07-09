export default function Categories({ categories }) {
  function handleScrollToCategory(catId) {
    const section = document.getElementById(`category-${catId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-8 py-8">
      <div className="flex items-center flex-col">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
          Menu
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleScrollToCategory(cat.id)}
              className="relative overflow-hidden px-4 py-2 text-white font-medium rounded-md group"
            >
              <button className="relative z-10 transition-colors duration-300 group-hover:text-sky-600">
                {cat.name}
              </button>
              <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </div>
          ))}
          <div
            onClick={() => handleScrollToCategory("addons")}
            className="relative overflow-hidden px-4 py-2 text-white font-medium rounded-md group cursor-pointer"
          >
            <button className="relative z-10 transition-colors duration-300 group-hover:text-sky-600">
              Addons
            </button>
            <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
