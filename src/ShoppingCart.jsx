import SideBar from "./components/Sidebar";
import { useParams } from "react-router";

import HomePage from './components/Home'
import ShopPage from './components/Shop'
import CartPage from './components/Cart'


export default function ShoppingCart() {
  const { page } = useParams()

  return (
    <>
      <SideBar />
      <main style={{flex: 4, height: "100vh"}}>
        {page === "home" ? (
          <HomePage />
        ) : page === "shop" ? (
          <ShopPage />
        ) : (
          <CartPage />
        )}
      </main>
    </>
  );
}
