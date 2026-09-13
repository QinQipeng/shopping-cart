import SideBar from "./components/Sidebar";
import { useParams } from "react-router";

import HomePage from './components/Home'
import ShopPage from './components/Shop'
import CartPage from './components/Cart'
import { useState } from "react";


export default function ShoppingCart() {
  const { page } = useParams()
  const [cart, setCart] = useState({});

  return (
    <>
      <SideBar path={page}/>
      <main style={{flex: 5, height: "100vh"}}>
        {page === "home" ? (
          <HomePage />
        ) : page === "shop" ? (
          <ShopPage cart={cart} setCart={setCart}/>
        ) : (
          <CartPage cart={cart} setCart={setCart}/>
        )}
      </main>
    </>
  );
}
