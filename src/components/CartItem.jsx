
import styles from "/src/css/cart.module.css";
import { X } from "/src/lib/icons";

const fmtPrice = function (unit, num) {
  return `${unit}${num.toFixed(2)}`;
};

export default function CartItem({ item, handleDelete }) {
  return (
    <li className={styles.cartItem}>
      <img src={item.src} alt="" />
      <div>
        <p>
          <span>Name:</span> {item.name}
        </p>
        <p>
          <span>Qty:</span> {item.quantity}
        </p>
        <p>
          <span>Price:</span> {fmtPrice(item.unit, item.price)}
        </p>
        <p>
          <span>Amount:</span> {fmtPrice(item.unit, item.price * item.quantity)}
        </p>
      </div>
      <button
        onClick={() => handleDelete(item.name)}
        className={styles.removeItem}
      >
        <X />
      </button>
    </li>
  );
}