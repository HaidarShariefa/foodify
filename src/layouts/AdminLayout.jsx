import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-sky-600 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="categories" className="hover:underline">
            Manage Categories
          </NavLink>
          <NavLink to="items" className="hover:underline">
            Manage Items
          </NavLink>
          <NavLink to="addons" className="hover:underline">
            Manage Add-ons
          </NavLink>
          <NavLink to="menu" className="hover:underline">
            View Menu
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
