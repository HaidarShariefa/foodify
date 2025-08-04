import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./pages/admin/Categories";
import Items from "./pages/admin/Items";
import Addons from "./pages/admin/Addons";
import FullMenu from "./pages/admin/FullMenu";
import Settings from "./pages/admin/Settings";
import UserLayout from "./layouts/UserLayout";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "categories", element: <Categories /> },
      { path: "items", element: <Items /> },
      { path: "addons", element: <Addons /> },
      { path: "settings", element: <Settings /> },
      { path: "menu", element: <FullMenu /> },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
  },
]);

export default router;
