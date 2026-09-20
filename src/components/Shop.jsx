import styles from "/src/css/shop.module.css";
import ProdCard from "./Product";

import { ALL_PRODUCTS as PRODUCTS } from "/src/lib/data";

export default function ShopPage({ cart, setCart }) {
  const handleAddtoCart = function (product, quantity) {
    const newCart = { ...cart };
    newCart[product.name] = {
      ...product,
      quantity:
        product.name in cart    // Checking if the product has already in cart
          ? cart[product.name].quantity + quantity
          : quantity,
    };
    localStorage.setItem("cart",JSON.stringify(newCart))
    setCart(newCart);
  };

  return (
    <div className="layout">
      <h1 className={styles.title}>Shop Page</h1>
      <div className={styles.products}>
        {PRODUCTS.map((product) => (
          <ProdCard
            key={product.name}
            product={product}
            style={styles}
            isShop={true}
            handleAddtoCart={handleAddtoCart}
          />
        ))}
      </div>
    </div>
  );
}
