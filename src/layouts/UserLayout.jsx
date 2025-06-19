import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <header className="bg-white shadow p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">Foodify</Link>
        <Link to="/cart" className="text-blue-600">Cart</Link>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
