import CategoriesList from "../components/Layout/CategoriesList";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Layout/Footer";
import HeaderCart from "../components/Layout/HeaderCart";

const CartPage = () => {
  return (
    <div>
      <HeaderCart isCart={true} />
      <Cart />
      <CategoriesList/>
      <Footer />
    </div>
  );
};

export default CartPage;
