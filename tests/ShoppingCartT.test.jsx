import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import ShoppingCart from "/src/ShoppingCart"


describe('Shopping Cart', () => {
  it('renders headline', () => {
    const { main } = render(<ShoppingCart />);
    expect(main).toMatchFileSnapshot("./outputs/default.output.html");

  });
});