import { Link } from "react-router";
import { useState } from "react";
import {
  layout,
  logo,
  navItem,
  selectedItem,
} from "/src/css/sidebar.module.css";

const NAV_ITEMS = [
  {
    page: "home",
  },
  {
    page: "shop",
  },
  {
    page: "cart",
  },
];

function NavItem(props) {
  return (
    <li className={props.className} >
      <Link page={props.page} onClick={props.onClick} to={`/${props.page}`}>{props.title}</Link>
    </li>
  );
}

export default function SideBar() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleClick = (event) => {
    const targetPage = event.target.getAttribute("page");
    setCurrentPage(targetPage);
  };

  return (
    <nav className={layout}>
      <div className={logo}>
        <img src="/src/assets/wolfy-cafe.svg" alt="" />
        <h1>WOLFY CAFÉ</h1>
      </div>
      <ul role="list">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.page}
            page={item.page}
            className={currentPage == item.page ? selectedItem : navItem}
            title={item.page.charAt(0).toUpperCase() + item.page.slice(1)}
            onClick={handleClick}
          />
        ))}
      </ul>
    </nav>
  );
}
