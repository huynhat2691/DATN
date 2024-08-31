import Footer from "../components/Layout/Footer";
import HeaderCart from "../components/Layout/HeaderCart";
// import CheckoutSteps from "../components/Checkout/CheckoutSteps"
import Checkout from "../components/Checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <HeaderCart isCart={false} />
      <br />
      <Checkout />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
