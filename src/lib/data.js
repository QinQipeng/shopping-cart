import Americano from "/src/assets/products/Americano.jpg";
import Cappuccino from "/src/assets/products/Cappuccino.jpg";
import Latte from "/src/assets/products/Latte.jpg";
import FlatWhite from "/src/assets/products/Flat White.jpg";
import IcedLatte from "/src/assets/products/Iced Latte.jpg";
import IcedCholat from "/src/assets/products/Iced Cholat.jpg";
import IcedMocha from "/src/assets/products/Iced Mocha.jpg";
import ColdBrew from "/src/assets/products/Cold Brew.jpg";
import Crossaint from "/src/assets/products/Crossaint.jpg";
import AlmondCrossaint from "/src/assets/products/AlmondCross.jpg";
import ChocoCrossaint from "/src/assets/products/ChocoCross.jpg";

const ALL_PRODUCTS = [
  {
    name: "Americano",
    price: 7,
    unit: "$",
    src: Americano,
  },
  {
    name: "Cappucino",
    price: 7.5,
    unit: "$",
    src: Cappuccino,
  },
  {
    name: "Latte",
    price: 8,
    unit: "$",
    src: Latte,
  },
  {
    name: "Flat White",
    price: 7.5,
    unit: "$",
    src: FlatWhite,
  },
  {
    name: "Iced Latte",
    price: 8.5,
    unit: "$",
    src: IcedLatte,
  },
  {
    name: "Iced Cholat",
    price: 9,
    unit: "$",
    src: IcedCholat,
  },
  {
    name: "Iced Mocha",
    price: 8.5,
    unit: "$",
    src: IcedMocha,
  },
  {
    name: "Cold Brew",
    price: 7.5,
    unit: "$",
    src: ColdBrew,
  },
  {
    name: "Crossaint",
    price: 6.5,
    unit: "$",
    src: Crossaint,
  },
  {
    name: "Almond Crossaint",
    price: 7,
    unit: "$",
    src: AlmondCrossaint,
  },
  {
    name: "Chocolate Crossaint",
    price: 7,
    unit: "$",
    src: ChocoCrossaint,
  },
];

const MOCK_CART_ITEMS = ALL_PRODUCTS.filter((_, index) => index < 10).map(
  (item, index) => {
    return { ...item, quantity: index + 1 };
  },
);

export { ALL_PRODUCTS, MOCK_CART_ITEMS };
