import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, queryAllByRole } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event"
import { createMemoryRouter, RouterProvider, redirect } from 'react-router';

import ShoppingCart from "/src/ShoppingCart"

let router;
let user;

beforeEach(() => {
  router = createMemoryRouter([
    {
      path: "/",
      element: <ShoppingCart />,
      loader: () => redirect("/home")
    },
    {
      path: "/:page",
      element: <ShoppingCart />,
    },
  ],{
    initialEntries: ['/']
  });

  user = userEvent.setup();
})

describe('Shopping Cart', () => {
  it('testing sidebar nav', async () => {
    const { container } = render(
      <RouterProvider router={router} />
    );

    await expect(container).toMatchFileSnapshot("./outputs/default.output.html");
    const nav = screen.queryByRole("navigation");
    const [home, shop, cart] = Array.from(queryAllByRole(nav,"link"));

    await user.click(shop);
    expect(screen.queryByRole("main").querySelector("h1").textContent).toMatch(/shop page/i)

    await user.click(cart);
    expect(screen.queryByRole("main").querySelector("h1").textContent).toMatch(/cart page/i)

    await user.click(home);
    expect(screen.queryByRole("main").querySelector("h1").textContent).toMatch(/start your day with wolfy café!/i)
  });
});