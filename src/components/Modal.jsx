import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import CartContext from "../store/shopping-cart-context";

// import { use } from "react"; // more flexible and can be used in code blocks like if statement or loops. React > 19.

const Modal = forwardRef(function Modal(_, ref) {
  const cartCtx = useContext(CartContext);

  let btnClasses =
    "bg-[#271e07] hover:bg-[#382e1b;] px-2 py-1 rounded-md text-[#f3e7d4]";

  const formattedPrice = cartCtx.allPrice.toFixed(2);

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="max-w-96 w-11/12 p-5 rounded-md bg-[#d3b17b] backdrop:bg-stone-900/70 shadow-md select-none"
    >
      <h2 className="text-[#4f3807] uppercase font-bold text-xl">your cart</h2>
      {Object.keys(cartCtx.items).length > 0 ? (
        <ul className="flex flex-col gap-2 my-3">
          {Object.keys(cartCtx.items).map((item) => (
            <li
              key={item}
              className="bg-[#fbd392] p-2 rounded-md flex items-center justify-between gap-2 flex-wrap capitalize"
            >
              {item} (${cartCtx.items[item].price.toFixed(2)})
              <div>
                <button
                  className="hover:bg-yellow-400 px-2 rounded"
                  onClick={() => cartCtx.decreamentItemCount(item)}
                >
                  -
                </button>
                <span className="px-2">{cartCtx.items[item].count}</span>
                <button
                  className="hover:bg-yellow-400 px-2 rounded"
                  onClick={() => cartCtx.increamentItemCount(item)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No items in cart!</p>
      )}
      <p className="text-end">Cart Total: ${formattedPrice}</p>
      <form method="dialog" className="flex justify-end gap-3 flex-wrap mt-3">
        <button className={btnClasses}>close</button>
        {cartCtx.allPrice > 0 ? (
          <button className={btnClasses}>Ckeckout</button>
        ) : null}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
