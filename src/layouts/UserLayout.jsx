import { fetchPeripherals } from "../firebase/actions/peripheralsActions";
import { fetchCategories } from "../firebase/actions/categoryActions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../components/user-components/Categories";
import Banner from "../components/user-components/Banner";
import Header from "../components/user-components/Header";
import Items from "../components/user-components/Items";
import Cart from "../components/user-components/Cart";

export default function UserLayout() {
  const [peripherals, setPeripherals] = useState({
    name: "",
    logo: null,
    banner: null,
  });

  const [cartOpen, setCartOpen] = useState(false);

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    async function loadData() {
      const data = {
        peripherals: await fetchPeripherals(),
        categories: await fetchCategories(),
      };
      if (data) {
        setPeripherals(data.peripherals);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-blue-950 to-sky-300">
      <Header
        name={peripherals.name}
        logo={peripherals.logo}
        onCartClick={() => setCartOpen(true)}
      />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)}>
        <p>Product 1</p>
        <p>Product 2</p>
        <p>Total: $99</p>
      </Cart>
      <Banner banner={peripherals.banner} />
      <Categories categories={categories} />
      <Items categories={categories} />
    </div>
  );
}
