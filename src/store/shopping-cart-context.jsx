import { createContext } from "react";

const CartContext = createContext({
  items: {},
  allPrice: 0,
  addItemToCart: () => {},
  increamentItemCount: () => {},
  decreamentItemCount: () => {},
});

export default CartContext;
