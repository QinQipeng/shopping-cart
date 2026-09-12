import { Link, useParams } from "react-router";
import { useState } from "react";
import {
  layout,
  logo,
  navItem,
  selectedItem,
  profileTab
} from "/src/css/sidebar.module.css";
import brandLogo from "/src/assets/logos/wolfy-cafe.svg"
import profilePicture from "/src/assets/profile_picture.png"
import { Settings, ShoppingCart } from "lucide-react";

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

function NavItem({page, className, onClick}) {
  const displayTitle = page.title.charAt(0).toUpperCase() + page.title.slice(1)
  return (
    <li className={className} >
      <Link page={page.title} onClick={onClick} to={`/${page.title}`}>{displayTitle}</Link>
    </li>
  );
}

export default function SideBar() {
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(page);

  const handleClick = (event) => {
    const targetPage = event.target.getAttribute("page");
    setCurrentPage(targetPage);
  };

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
            className={currentPage == page.title ? selectedItem : navItem}
            onClick={handleClick}
          />
        ))}
      </ul>
      <div className={profileTab}> 
        <img src={profilePicture} alt="profile_picture" />
        <p>Hello, Wolfy!</p>
        <div>
          <button>
            <Settings/>
          </button>
          <button>
            <ShoppingCart />
          </button>
        </div>
      </div>
    </nav>
  );
}
