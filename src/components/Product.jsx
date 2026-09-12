import { useState } from "react";
import { ShoppingCartPlus, ChevronLeft, ChevronRight } from "/src/lib/icons.js";

export default function ProdCard(product, style, isShop = false) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div key={product.name} className={style.card}>
      <img src={product.src} alt={product.name} />
      <div className={style.prodInfo}>
        <h4>{product.name}</h4>
        {`${product.unit}${product.price.toFixed(2)}`}
      </div>
      {isShop && (
        <>
          <div className={style.qtyControl}>
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}><ChevronLeft /></button>
            <input type="number" name="quantity" value={quantity} step={1} />
            <button onClick={() => setQuantity(quantity + 1)}><ChevronRight/></button>
          </div>
          <button className="addToCart">
            <ShoppingCartPlus />
          </button>
        </>
      )}
    </div>
  );
}
