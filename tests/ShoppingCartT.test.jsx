import { describe, it, expect, beforeAll, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  queryAllByRole,
  getByRole,
  getAllByRole,
  getByText,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, redirect } from "react-router";

import ShoppingCart from "/src/ShoppingCart";
import ShopPage from "/src/components/Shop";


let user = userEvent.setup();

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
  })

  describe("Home Page Testing", () => {
    beforeAll(async() => {
      render(<RouterProvider router={router} />);
      await user.click(screen.getByRole("link", { name: "Home" }));
    })

    it('test "Take Order" redirect button', async () => {
      const navButton = screen.getByRole("button", { name: "Take Order" });
      await user.click(navButton);
      expect(screen.getByRole("main").querySelector("h1").textContent).toMatch(
        /shop page/i,
      );
    });
  });
});



describe("Shopping Page Testing", () => {
  let mockCart;
  let mockSetCart;
  let container;
  let rerender;

  beforeEach(async () => {
    mockCart = {};
    mockSetCart = vi.fn((newState) => {
      mockCart = newState;
      rerender(<ShopPage cart={mockCart} setCart={mockSetCart} />);
    });

    const rendered = render(<ShopPage cart={mockCart} setCart={mockSetCart} />);
    container = rendered.container;
    rerender = rendered.rerender;

    await expect(container).toMatchFileSnapshot(
      "./outputs/shop-page.output.html",
    );
  });

  it("test shop add product", async () => {
    const products = Array.from(container.querySelectorAll('[class*="card"]'));
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
    const products = Array.from(container.querySelectorAll('[class*="card"]'));
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
    const products = Array.from(container.querySelectorAll('[class*="card"]'));
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
    expect(parseInt(getByRole(americano, "spinbutton").value)).toBeGreaterThan(
      0,
    ); // Quantity should be greater than 0
  });
});
