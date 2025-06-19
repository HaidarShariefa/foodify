import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Items from "./pages/admin/Items";
import Addons from "./pages/admin/Addons";
import FullMenu from "./pages/admin/FullMenu";

// User pages
// import Home from "./pages/user/Home";
// import Menu from "./pages/user/Menu";
// import Cart from "./pages/user/Cart";
// import Checkout from "./pages/user/Checkout";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "categories", element: <Categories /> },
      { path: "items", element: <Items /> },
      { path: "addons", element: <Addons /> },
      { path: "menu", element: <FullMenu /> },
    ],
  },
  // {
  //   path: "/",
  //   element: <UserLayout />,
  //   children: [
  //     { index: true, element: <Home /> },
  //     { path: "menu", element: <Menu /> },
  //     { path: "cart", element: <Cart /> },
  //     { path: "checkout", element: <Checkout /> },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
