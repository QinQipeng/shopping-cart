import styles from "/src/css/cart.module.css";
import { MOCK_CART_ITEMS } from "../lib/data";
import { X, CreditCardCheck } from "/src/lib/icons"

const fmtPrice = function(unit, num) {
  return `${unit}${num.toFixed(2)}`
}

function CartItem({ item }) {
  return (
    <li className={styles.cartItem}>
      <img src={item.src} alt="" />
      <div>
        <p><span>Name:</span> {item.name}</p>
        <p><span>Qty:</span> {item.quantity}</p>
        <p><span>Price:</span> {fmtPrice(item.unit, item.price)}</p>
        <p><span>Amount:</span> {fmtPrice(item.unit, item.price * item.quantity)}</p>
      </div>
      <button className={styles.removeItem}><X/></button>
    </li>
  );
}

export default function CartPage() {
  return (
    <div className={`layout ${styles.layout}`}>
      <h1>Cart Page</h1>
      <ol className={styles.container}>
        {MOCK_CART_ITEMS.map((props) => <CartItem key={props.name} item={props} />)}
        <div className={styles.total}><span>Total Amount:</span> ${
          MOCK_CART_ITEMS
            .reduce((sum, item) => sum+item.price * item.quantity, 0)
            .toFixed(2)}
        </div>
      </ol>
      <button className={styles.checkOut}><CreditCardCheck /> Check Out</button>
    </div>
  );
}
