import MyContainer from "./MyContainer";
import { DUMMY_PRODUCTS } from "../dummy-products.js";
import Product from "./Product.jsx";

const MainContent = () => {
  return (
    <main className="py-8">
      <MyContainer>
        <div className="my-grid">
          {DUMMY_PRODUCTS.map((product) => (
            <Product key={product.title} productObj={product} />
          ))}
        </div>
      </MyContainer>
    </main>
  );
};

export default MainContent;
