import { useState, Fragment } from "react";
import styles from "/src/css/cart.module.css";
import { X, CreditCardCheck, CircleCheck, Trash } from "/src/lib/icons";

const fmtPrice = function (unit, num) {
  return `${unit}${num.toFixed(2)}`;
};

const getTotal = (cartItems) => {
  return cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
};

function CartItem({ item, handleDelete }) {
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

export default function CartPage({ cart, setCart }) {
  const [isChecked, checkOut] = useState(false);
  const CART_ITEMS = Object.values(cart);

  const handleDelete = function (prodName) {
    const newCart = { ...cart };
    delete newCart[prodName];
    localStorage.setItem("cart",JSON.stringify(newCart))
    setCart(newCart);
  };

  const handleClearCart = () => {
    localStorage.setItem("cart",JSON.stringify({}))
    setCart({})
  };

  const handleCheckout = () => {
    checkOut((prevState) => !prevState);
  };

  return (
    <Fragment>
      {isChecked && (
        <div className={styles.paymentSucceed}>
          <div>
            <CircleCheck className={styles.circleCheck} />
            <div>
              <h3>Payment Suceed!</h3>
              <p>Enjoy your products at WolfyCafe!</p>
            </div>
            <button
              onClick={() => {
                checkOut(false);
                setCart({});
              }}
            >
              <X />
            </button>
          </div>
        </div>
      )}
      <div className={`layout ${styles.layout}`}>
        <h1>Cart Page</h1>
        <ol className={styles.container}>
          {CART_ITEMS.map((props) => (
            <CartItem
              key={props.name}
              item={props}
              handleDelete={handleDelete}
            />
          ))}
          <div className={styles.total}>
            <span>Total Amount:</span> ${getTotal(CART_ITEMS)}
          </div>
        </ol>
        <div className={styles.buttonGroup}>
          <button title="clear cart" onClick={handleClearCart}>
            <Trash />
          </button>
          <button
            className={styles.checkOut}
            onClick={handleCheckout}
            disabled={CART_ITEMS.length <= 0}
            title={
              CART_ITEMS.length > 0
                ? "Click to Buy!"
                : "Go fill your cart first!"
            }
          >
            <CreditCardCheck />
            Check Out
          </button>
        </div>
      </div>
    </Fragment>
  );
}
