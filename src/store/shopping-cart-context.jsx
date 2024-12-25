import { createContext } from "react";

const CartContext = createContext({
  items: {},
  allPrice: 0,
  addItemToCart: () => {},
  incrementItemCount: () => {},
  decrementItemCount: () => {},
});

export default CartContext;
