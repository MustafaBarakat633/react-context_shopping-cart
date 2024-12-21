import { useRef, useContext } from "react";
import Modal from "./Modal";
import MyContainer from "./MyContainer";
import shirtImg from "../assets/shirt.svg";
import CartContext from "../store/shopping-cart-context";

const Header = () => {
  const { items } = useContext(CartContext);

  const modal = useRef();

  function handleShowModal() {
    modal.current.open();
  }

  return (
    <header className="py-4 bg-stone-50">
      <MyContainer>
        <Modal ref={modal} />
        <div className="flex justify-between items-center gap-2">
          <div className="flex justify-between items-center gap-3">
            <img src={shirtImg} alt="Logo" className="w-5" />
            <h1 className="uppercase text-yellow-500 font-bold md:text-xl">
              elegant context
            </h1>
          </div>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-amber-950 px-3 py-1 rounded"
            onClick={handleShowModal}
          >
            Cart ({Object.keys(items).length})
          </button>
        </div>
      </MyContainer>
    </header>
  );
};

export default Header;
