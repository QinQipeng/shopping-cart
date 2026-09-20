import SideBar from "./components/Sidebar";
import { useParams } from "react-router";

import HomePage from "./components/Home";
import ShopPage from "./components/Shop";
import CartPage from "./components/Cart";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
  const { page } = useParams();
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function getLocalStorage() {
      const savedData = JSON.parse(localStorage.getItem("cart"));
      if (savedData) {
        setCart(savedData);
      }
    }
    getLocalStorage();
  }, []);

  return (
    <>
      <SideBar path={page} cartSize={Object.keys(cart).length} />
      <main style={{ flex: 5, height: "100vh" }}>
        {page === "home" ? (
          <HomePage />
        ) : page === "shop" ? (
          <ShopPage cart={cart} setCart={setCart} />
        ) : (
          <CartPage cart={cart} setCart={setCart} />
        )}
      </main>
    </>
  );
}
