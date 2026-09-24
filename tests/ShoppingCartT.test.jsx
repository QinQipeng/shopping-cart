import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

  it('renders headline', async () => {
    const { container } = render(
      <RouterProvider router={router} />
    );
    await expect(container).toMatchFileSnapshot("./outputs/default.output.html");
  });

  it('sidebar redirect correctly', async () => {
    render(<RouterProvider router={router} />);
    const nav = await screen.queryByRole("main", {hidden: true});
    console.log(nav)
    // console.log(container.getByRole("list", {hidden: true}))
    
  });

});