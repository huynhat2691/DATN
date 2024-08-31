/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import EventCard from "../Route/Events/EventCard";

const SuggestedProduct = ({ data, isEvent, currentId }) => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const [productData, setProductData] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    if (allProducts && data) {
      const d = allProducts.filter((i) => i.category === data.category && i._id !== currentId);
      setProductData(d);
    }
  }, [allProducts, data, currentId]);

  useEffect(() => {
    if (allEvents && data) {
      const d = allEvents.filter((i) => i.category === data.category && i._id !== currentId);
      setEventData(d);
    }
  }, [allEvents, data, currentId]);

  const hasItems = isEvent ? eventData.length > 0 : productData.length > 0;

  if (!data || !hasItems) return null;

  return (
    <div className="w-[1300px] mx-auto">
      <h2 className="text-[20px] font-[400]">Có thể bạn cũng thích</h2>
      <Separator className="my-5" />
      {isEvent ? (
        <div className="grid grid-cols-6 gap-[10px] mb-12">
          {eventData.map((i, index) => <EventCard data={i} key={index} />)}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-[10px] mb-12">
          {productData.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;