import { layout } from "/src/css/home.module.css"

import logo from "/src/assets/logos/wolfy-cafe.svg"
import logoRev from "/src/assets/logos/wolfy-cafe-rev.svg"
import addressMap from "/src/assets/wolfyCafe-google-map.png"
import retail from "/src/assets/wolfy-cafe-retail.png"

import products from "../lib/products";


const DISPLAY_NUM = 1
const CONTACT_INFO = [
  {
    title: "Location",
    data: "14A Cameron Road, \nTsim Sha Tsui, Kowloon, \nHong Kong"
  },
  {
    title: "Working Hours",
    data: "09:30~20:00",
  },
  {
    title: "Tel",
    data: "+852 21100226"
  },
  {
    title: "Email",
    data: "WolfyCafe@gmail.com"
  }
]

export default function HomePage() {
  return (
    <div className={layout}>
      <section className="hero">
        <div className="advertize">
          <h1 className="title">Start Your Day with Wolfy Café!</h1>
          <p className="subtext">With a world champion level in fermentation and roasting techniques at the helm, our freshly brewed coffee is to elevate your day with the highest quality experience!</p>
        </div>
        <button>Take Order</button>
      </section>
      <section className="recommendation">
        <h2>Try Our Hot Sellers of the Season!</h2>
        <div className="products">
          {
            products.filter((_, index) => index < DISPLAY_NUM).map((product) => {
              return (
                <div key={product.name} className="card">
                  <img src={product.src} alt={product.name} />
                  <div className="prod-info">
                    <h4>{product.name}</h4>
                    {`${product.unit}${product.price.toFixed(2)}`}
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <section className="contact">
        <div className="logo">
          <img src={logoRev} alt="" />
          <h3>WOLFY CAFÉ</h3>
        </div>
        <div className="contact-info">
          <ul>
            {
              (CONTACT_INFO.map((contact) => {
                return (
                  <li key={contact.title}>{contact.title}: <span className="attr">{contact.data}</span> </li>
                )
              }))
            }
          </ul>
        </div>
        <div className="address-images">
          <img src={retail} alt="cafe retail display" />
          <img src={addressMap} alt="cafe google map" />
        </div>
      </section>
      <footer className="footer">Copyright Wolfy Café © 2026</footer>
    </div>
  );
}
