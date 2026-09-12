import styles from "/src/css/cart.module.css";
import { MOCK_CART_ITEMS } from "../lib/data";

export default function CartPage() {
  return (
    <div className="layout">
      <h1>Cart Page</h1>
      <div>  
        {MOCK_CART_ITEMS.map((props) => (
          <div style={{whiteSpace: "pre-line"}}>
            {`
              Name: ${props.name}
              Price: ${props.unit}${props.price.toFixed(2)}
              Quantity: ${props.quantity}
              Amount: ${props.unit}${(props.price * props.quantity).toFixed(2)}
            `}
          </div>
        ))}
      </div>
    </div>
  );
}
