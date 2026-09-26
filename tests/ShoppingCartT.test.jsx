import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  vi,
  afterAll,
} from "vitest";

import {
  render,
  screen,
  queryAllByRole,
  getByRole,
  getAllByRole,
} from "@testing-library/react";

import { userEvent } from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, redirect } from "react-router";

import ShoppingCart from "/src/ShoppingCart";
import ShopPage from "/src/components/Shop";
import CartPage from "/src/components/Cart";

let user = userEvent.setup();
vi.mock("./CartItem", () => ({ item, handleDelete }) => {
  <li>
    <div>{item}</div>
    <button onClick={() => handleDelete(item.name)}></button>
  </li>;
});

describe("Navigation Testing", () => {
  let router;

  beforeAll(() => {
    router = createMemoryRouter(
      [
        {
          path: "/",
          element: <ShoppingCart />,
          loader: () => redirect("/home"),
        },
        {
          path: "/:page",
          element: <ShoppingCart />,
        },
      ],
      {
        initialEntries: ["/"],
      },
    );
  });

  it("generate shopping cart app snapshot", async () => {
    const { container } = render(<RouterProvider router={router} />);

    await expect(container).toMatchFileSnapshot(
      "./outputs/shopping-cart.output.html",
    );
  });

  describe("Sidebar Testing", () => {
    it("testing sidebar navigation", async () => {
      render(<RouterProvider router={router} />);

      const nav = screen.getByRole("navigation");
      const [home, shop, cart] = Array.from(queryAllByRole(nav, "link"));

      await user.click(shop);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /shop page/i,
      );

      await user.click(cart);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /cart page/i,
      );

      await user.click(home);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /start your day with wolfy café!/i,
      );
    });

    it("test cart redirect button", async () => {
      render(<RouterProvider router={router} />);

      const cartButton = screen.getByTestId("cart-redirect");
      await user.click(cartButton);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /cart page/i,
      );
    });
  });

  describe("Home Page Testing", () => {
    beforeAll(async () => {
      render(<RouterProvider router={router} />);
      await user.click(screen.getByRole("link", { name: "Home" }));
    });

    it('test "Take Order" redirect button', async () => {
      const navButton = screen.getByRole("button", { name: "Take Order" });
      await user.click(navButton);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /shop page/i,
      );
    });
  });
});

describe("Cart Functionality Testing", () => {
  let mockCart;
  let mockSetCart;
  let container;
  let rerender;

  describe("Shop Page Testing", () => {
    beforeEach(async () => {
      mockCart = {};
      mockSetCart = vi.fn((newState) => {
        mockCart = newState;
        rerender(<ShopPage cart={mockCart} setCart={mockSetCart} />);
      });

      ({ container, rerender } = render(
        <ShopPage cart={mockCart} setCart={mockSetCart} />,
      ));

      await expect(container).toMatchFileSnapshot(
        "./outputs/shop-page.output.html",
      );
    });

    afterAll(() => {
      mockCart = {};
      mockSetCart = undefined;
      container = undefined;
      rerender = undefined;
    });

    it("test shop add product", async () => {
      const products = Array.from(
        container.querySelectorAll('[class*="card"]'),
      );
      const addToCart = products[0].querySelector(".addToCart");

      await user.click(addToCart);
      expect(mockCart).toMatchObject({
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        },
      });
    });

    it("test add multiple products", async () => {
      const productToBuy = ["Americano", "Iced Latte", "Crossaint"];

      let products = Array.from(container.querySelectorAll('[class*="card"]'));
      products = products.filter((prod) => {
        return productToBuy.includes(getByRole(prod, "heading").textContent);
      });

      for (const [index, prod] of products.entries()) {
        const [_, add] = getAllByRole(prod, "button").filter(
          (button) => button.className != "addToCart",
        );
        const addToCart = prod.querySelector(".addToCart");

        for (let i = 0; i < index; i++) {
          await user.click(add);
        }
        await user.click(addToCart);
      }

      expect(mockCart).toMatchObject({
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        },
        "Iced Latte": {
          name: "Iced Latte",
          price: 8.5,
          unit: "$",
          src: "/src/assets/products/Iced%20Latte.jpg",
          quantity: 2,
        },
        Crossaint: {
          name: "Crossaint",
          price: 6.5,
          unit: "$",
          src: "/src/assets/products/Crossaint.jpg",
          quantity: 3,
        },
      });
    });

    it("test add same products twice", async () => {
      const products = Array.from(
        container.querySelectorAll('[class*="card"]'),
      );
      const americano = products.find(
        (prod) => getByRole(prod, "heading").textContent == "Americano",
      );

      const [_, add] = getAllByRole(americano, "button").filter(
        (button) => button.className != "addToCart",
      );
      const addToCart = products[0].querySelector(".addToCart");

      await user.click(addToCart);

      expect(mockCart).toMatchObject({
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        },
      });

      await user.click(add);
      await user.click(addToCart);
      expect(mockCart).toMatchObject({
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 3,
        },
      });
    });

    it("test quantity toggle", async () => {
      const products = Array.from(
        container.querySelectorAll('[class*="card"]'),
      );
      const americano = products.find(
        (prod) => getByRole(prod, "heading").textContent == "Americano",
      );

      const [sub, add] = getAllByRole(americano, "button").filter(
        (button) => button.className != "addToCart",
      );

      await user.click(add);
      expect(getByRole(americano, "spinbutton").value).toBe("2");

      await user.click(sub);
      await user.click(sub);
      expect(
        parseInt(getByRole(americano, "spinbutton").value),
      ).toBeGreaterThan(0); // Quantity should be greater than 0
    });
  });

  describe("Cart Page Testing", () => {

    beforeEach(async () => {
      mockCart = {};
      mockSetCart = vi.fn((newState) => {
        mockCart = newState;
        rerender(<CartPage cart={mockCart} setCart={mockSetCart} />);
      });

      ({ container, rerender } = render(
        <CartPage cart={mockCart} setCart={mockSetCart} />,
      ));

      await expect(container).toMatchFileSnapshot(
        "./outputs/cart-page.output.html",
      );
    });

    it("Testing Item Number and Total Figure", () => {
      mockCart = {
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        },
        "Iced Latte": {
          name: "Iced Latte",
          price: 8.5,
          unit: "$",
          src: "/src/assets/products/Iced%20Latte.jpg",
          quantity: 2,
        },
        Crossaint: {
          name: "Crossaint",
          price: 6.5,
          unit: "$",
          src: "/src/assets/products/Crossaint.jpg",
          quantity: 3,
        },
      };

      const total = Object.values(mockCart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      rerender(<CartPage cart={mockCart} setCart={mockSetCart} />);
      expect(screen.getByRole("list").childNodes.length - 1).toBe(
        Object.values(mockCart).length,
      );

      expect(screen.getByTestId("total-figure").textContent).toMatch(
        `Total Amount: $${total.toFixed(2)}`,
      );
    });

    it("Testing Check Out Button", () => {
      const checkOutButton = screen.getByRole("button", { name: "Check Out" });

      expect(checkOutButton).toBeDisabled();
      expect(checkOutButton.title).toMatch("Go fill your cart first!");

      rerender(
        <CartPage
          cart={{
            Americano: {
              name: "Americano",
              price: 7,
              unit: "$",
              src: "/src/assets/products/Americano.jpg",
              quantity: 1,
            },
          }}
          setCart={mockSetCart}
        />,
      );

      expect(checkOutButton).toBeEnabled();
      expect(checkOutButton.title).toMatch("Click to Buy!");
    });

    it("Testing Popup On Check Out", async () => {
      rerender(
        <CartPage
          cart={{
            Americano: {
              name: "Americano",
              price: 7,
              unit: "$",
              src: "/src/assets/products/Americano.jpg",
              quantity: 1,
            },
          }}
          setCart={mockSetCart}
        />,
      );

      const checkOutButton = screen.getByRole("button", { name: "Check Out" });
      await user.click(checkOutButton);

      const popup = screen.getByRole("dialog");
      expect(popup).toBeInTheDocument();

      await user.click(popup.querySelector("button"));
      expect(popup).not.toBeInTheDocument();
    });

    it("Testing Remove Cart Item", async () => {
      const initialProducts = {
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        }
      }

      rerender(
        <CartPage
          cart={initialProducts}
          setCart={mockSetCart}
        />,
      );

      const toBeDelete = screen.getAllByRole("listitem").at(-1);
      await user.click(toBeDelete.querySelector("button"));

      expect(toBeDelete).not.toBeInTheDocument();
    });

    it("Clear All Items from Cart", async() => {
      const initialProducts = {
        Americano: {
          name: "Americano",
          price: 7,
          unit: "$",
          src: "/src/assets/products/Americano.jpg",
          quantity: 1,
        },
        "Iced Latte": {
          name: "Iced Latte",
          price: 8.5,
          unit: "$",
          src: "/src/assets/products/Iced%20Latte.jpg",
          quantity: 2,
        },
        Crossaint: {
          name: "Crossaint",
          price: 6.5,
          unit: "$",
          src: "/src/assets/products/Crossaint.jpg",
          quantity: 3,
        },
      }

      rerender(
        <CartPage
          cart={initialProducts}
          setCart={mockSetCart}
        />,
      );

      const trashButton = screen.getByTitle("clear cart");
      await user.click(trashButton);

      expect(screen.queryAllByRole("listitem")).toMatchObject([]);
      
    })
  });
});
