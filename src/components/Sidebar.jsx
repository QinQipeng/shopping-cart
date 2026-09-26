import { Link, useNavigate } from "react-router";
import {
  layout,
  logo,
  navItem,
  selectedItem,
  profileTab,
  cartNotif
} from "/src/css/sidebar.module.css";
import brandLogo from "/src/assets/logos/wolfy-cafe.svg"
import profilePicture from "/src/assets/profile_picture.png"
import { Settings, ShoppingCart } from "/src/lib/icons";

const NAV_ITEMS = [
  {
    title: "home",
  },
  {
    title: "shop",
  },
  {
    title: "cart",
  },
];

function NavItem({page, className}) {
  const displayTitle = page.title.charAt(0).toUpperCase() + page.title.slice(1)
  return (
    <li className={className} >
      <Link page={page.title} to={`/${page.title}`}>{displayTitle}</Link>
    </li>
  );
}

export default function SideBar({path, cartSize}) {
  const navigate = useNavigate();

  return (
    <nav className={layout}>
      <div className={logo}>
        <img src={brandLogo} alt="" />
        <h1>WOLFY CAFÉ</h1>
      </div>
      <ul role="list">
        {NAV_ITEMS.map((page) => (
          <NavItem
            key={page.title}
            page={page}
            className={path == page.title ? selectedItem : navItem}
          />
        ))}
      </ul>
      <div className={profileTab}> 
        <img src={profilePicture} alt="profile_picture" />
        <p>Hello, <span>Wolfy John</span>!</p>
        <div>
          <button>
            <Settings/>
          </button>
          <button onClick={() => navigate("/cart")}>
              {cartSize > 0 && <div key={cartSize} className={cartNotif}>{cartSize}</div>}
              <ShoppingCart />
          </button>
        </div>
      </div>
    </nav>
  );
}
