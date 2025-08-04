import { fetchSettings } from "../firebase/actions/settingsActions";
import { fetchCategories } from "../firebase/actions/categoryActions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../components/user-components/Categories";
import Banner from "../components/user-components/Banner";
import Header from "../components/user-components/Header";
import Items from "../components/user-components/Items";
import Cart from "../components/user-components/Cart";
import Footer from "../components/user-components/Footer";

export default function UserLayout() {
  const [settings, setSettings] = useState({
    name: "",
    logo: null,
    banner: null,
  });

  const [cartOpen, setCartOpen] = useState(false);

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    async function loadData() {
      const data = {
        settings: await fetchSettings(),
        categories: await fetchCategories(),
      };
      if (data) {
        setSettings(data.settings);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-blue-950 to-sky-300">
      <Header
        name={settings.name}
        logo={settings.logo}
        onCartClick={() => setCartOpen(true)}
      />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)}>
        <p>Product 1</p>
        <p>Product 2</p>
        <p>Total: $99</p>
      </Cart>
      <Banner banner={settings.banner} />
      <Categories categories={categories} />
      <Items categories={categories} />
      <Footer />
    </div>
  );
}
