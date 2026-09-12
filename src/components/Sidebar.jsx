import { Link, useParams } from "react-router";
import { useState } from "react";
import {
  layout,
  logo,
  navItem,
  selectedItem,
} from "/src/css/sidebar.module.css";
import brandLogo from "/src/assets/logos/wolfy-cafe.svg"

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
