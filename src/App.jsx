import Header from "./components/Header";
import MainContent from "./components/MainContent";
import CartContextProvider from "./store/CartContextProvider";

const App = () => {
  return (
    <CartContextProvider>
      <Header />
      <MainContent />
    </CartContextProvider>
  );
};

export default App;
