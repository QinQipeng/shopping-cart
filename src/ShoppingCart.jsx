import SideBar from "./components/Sidebar";
import HomePage from "./components/Home";

export default function ShoppingCart() {
  return (
    <>
      <SideBar />
      <main style={{flex: 4}}>
        <HomePage />
      </main>
    </>
  );
}
