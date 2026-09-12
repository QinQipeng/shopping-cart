import styles from "/src/css/shop.module.css"
import ProdCard from "./Product";

import { ALL_PRODUCTS as PRODUCTS } from "/src/lib/data";

export default function ShopPage() {
  return (
    <div className="layout">
    <h1 className={styles.title}>Shop Page</h1>
    <div className={styles.products}>
      {PRODUCTS.map((product) =>
        ProdCard(product, styles, true),
      )}
    </div>
    </div>
  );
}
