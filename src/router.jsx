import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./pages/admin/Categories";
import Items from "./pages/admin/Items";
import Addons from "./pages/admin/Addons";
import FullMenu from "./pages/admin/FullMenu";
import Peripherals from "./pages/admin/Peripherals";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "categories", element: <Categories /> },
      { path: "items", element: <Items /> },
      { path: "addons", element: <Addons /> },
      { path: "peripherals", element: <Peripherals /> },
      { path: "menu", element: <FullMenu /> },
    ],
  },
]);

export default router;
