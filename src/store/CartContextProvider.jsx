import CartContext from "./shopping-cart-context";
import { useReducer } from "react";

const ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  INCREMENT_ITEM_COUNT: "increment-item-count",
  DECREMENT_ITEM_COUNT: "decrement-item-count",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      if (Object.keys(state.items).length === 0) {
        return {
          items: {
            [action.payload.itemObject.title]: {
              count: 1,
              price: action.payload.itemObject.price,
            },
          },
          allPrice: action.payload.itemObject.price,
        };
      } else {
        if (action.payload.itemObject.title in state.items) {
          return {
            items: {
              ...state.items,
              [action.payload.itemObject.title]: {
                count: state.items[action.payload.itemObject.title].count + 1,
                price: action.payload.itemObject.price,
              },
            },
            allPrice: state.allPrice + action.payload.itemObject.price,
          };
        } else {
          return {
            items: {
              ...state.items,
              [action.payload.itemObject.title]: {
                count: 1,
                price: action.payload.itemObject.price,
              },
            },
            allPrice: state.allPrice + action.payload.itemObject.price,
          };
        }
      }
    }

    case ACTIONS.INCREMENT_ITEM_COUNT: {
      return {
        items: {
          ...state.items,
          [action.payload.itemName]: {
            ...state.items[action.payload.itemName],
            count: state.items[action.payload.itemName].count + 1,
          },
        },
        allPrice: state.allPrice + state.items[action.payload.itemName].price,
      };
    }

    case ACTIONS.DECREMENT_ITEM_COUNT: {
      if (action.payload.itemName in state.items) {
        if (state.items[action.payload.itemName].count > 1) {
          return {
            items: {
              ...state.items,
              [action.payload.itemName]: {
                ...state.items[action.payload.itemName],
                count: state.items[action.payload.itemName].count - 1,
              },
            },
            allPrice:
              state.allPrice - state.items[action.payload.itemName].price,
          };
        } else {
          const { [action.payload.itemName]: deletedItem, ...restItems } =
            state.items;
          return {
            items: restItems,
            allPrice: state.allPrice - deletedItem.price,
          };
        }
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(reducer, {
    items: {},
    allPrice: 0,
  });

  function handleAddToCart(itemObject) {
    shoppingCartDispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { itemObject },
    });
  }

  function handleIncrementItemCount(itemName) {
    shoppingCartDispatch({
      type: ACTIONS.INCREMENT_ITEM_COUNT,
      payload: { itemName },
    });
  }

  function handleDecrementItemCount(itemName) {
    shoppingCartDispatch({
      type: ACTIONS.DECREMENT_ITEM_COUNT,
      payload: { itemName },
    });
  }

  // console.log(shoppingCart);

  const ctxValue = {
    items: shoppingCart.items,
    allPrice: shoppingCart.allPrice,
    addItemToCart: handleAddToCart,
    incrementItemCount: handleIncrementItemCount,
    decrementItemCount: handleDecrementItemCount,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
