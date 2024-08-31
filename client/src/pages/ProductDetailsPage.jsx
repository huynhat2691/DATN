import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useEffect, useState } from "react";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
import CategoriesList from "../components/Layout/CategoriesList";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const [isEvent, setIsEvent] = useState(false);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
      setIsEvent(true);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
      setIsEvent(false);
    }
  }, [allProducts, allEvents, id, eventData]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} isEvent={isEvent} />
      {data && (
        <SuggestedProduct data={data} isEvent={isEvent} currentId={id} />
      )}
      <CategoriesList/>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
