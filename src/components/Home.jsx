import styles from "/src/css/home.module.css";

import logoRev from "/src/assets/logos/wolfy-cafe-rev.svg";
import addressMap from "/src/assets/wolfyCafe-google-map.png";
import retail from "/src/assets/wolfy-cafe-retail.png";
import portrait from "/src/assets/me.jpg"
import ProdCard from "./Product";
import { useNavigate } from "react-router";

import { ALL_PRODUCTS as PRODUCTS, CONTACT_INFO } from "/src/lib/data";

const DISPLAY_NUM = 4;

function ContactItem(contact) {
  return (
    <li key={contact.title}>
      {contact.title}: <span className={styles.attr}>{contact.data}</span>{" "}
    </li>
  );
}

const selfIntro = <article>
  <strong>Wolfy Café</strong> was founded by a passionate coffee
  enthusiast who believed that great coffee should feel both{" "}
  <strong>crafted and personal</strong>. Inspired by the calm focus of a
  wolf and the warmth of a neighborhood café, the owner set out to
  create a space where every cup tells a story.
  <br />
  <br />
  At Wolfy Café, we are dedicated to{" "}
  <strong>high-quality, hand-crafted coffee</strong> — from carefully
  selected beans to precise brewing techniques. Every drink is made with
  attention to detail, balancing flavor, aroma, and texture. Alongside
  our coffee, we offer a selection of{" "}
  <strong>freshly prepared snacks and pastries</strong>, designed to
  complement each cup.
  <br />
  <br />
  More than just a café, Wolfy Café is a place to slow down, enjoy the
  process, and experience coffee the way it was meant to be —{" "}
  <strong>intentional, refined, and made by hand</strong>. 🐺☕
</article>;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <section className={styles.hero}>
        <div className={styles.advertize}>
          <h1>Start Your Day with Wolfy Café!</h1>
          <p>
            With a world champion level in fermentation and roasting techniques
            at the helm, our freshly brewed coffee is to elevate your day with
            the highest quality experience!
          </p>
          <button className={styles.takeOrder} onClick={() => navigate("/shop")}>Take Order</button>
        </div>
      </section>
      <section className={styles.recommendations}>
        <h2>Try Our Hot Sellers of the Season!</h2>
        <div className={styles.products}>
          {PRODUCTS.filter((_, index) => index < DISPLAY_NUM).map((product) =>
            <ProdCard key={product.name} product={product} style={styles}/>,
          )}
        </div>
      </section>
      <section className={styles.contact}>
        <div className={styles.logo}>
          <img src={logoRev} alt="" />
          <h3>WOLFY CAFÉ</h3>
        </div>
        <h1>About Us</h1>
        <div className={styles.aboutMe}>
          <img src={portrait} alt="hand-drawn wolf picture" />
          {selfIntro}
        </div>
        <h1>Contact Us</h1>
        <div className={styles.contactInfo}>
          <ul>{CONTACT_INFO.map((contact) => ContactItem(contact))}</ul>
          <div className={styles.addressImages}>
            <img src={retail} alt="cafe retail display" />
            <img src={addressMap} alt="cafe google map" />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>Copyright Wolfy Café © 2026</footer>
    </div>
  );
}
