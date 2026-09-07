import { layout } from "/src/css/home.module.css"

export default function HomePage() {
  return (
    <div className={layout}>
      <section className="hero">
        <div className="info">
          <h1 className="title">Start Your Day with Wolfy Café!</h1>
          <p className="subtext">With a world champion level in fermentation and roasting techniques at the helm, our freshly brewed coffee is to elevate your day with the highest quality experience!</p>
        </div>
        <button>Take Order</button>
      </section>
      <section className="recommendation">
        <h2>Try Our Hot Sellers of the Season!</h2>
        <div className="products">
          
        </div>
      </section>
      <section className="contact">
        <div className="logo">
          <img src="/src/assets/wolfy-cafe-rev.svg" alt="" />
          <h3>WOLFY CAFÉ</h3>
        </div>
        <div className="contact-info">
          <ul>
            
          </ul>
        </div>
      </section>
      <footer className="footer">Copyright Wolfy Café © 2026</footer>
    </div>
  );
}
