/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Separator } from "../components/ui/separator";
import { Filter } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const { allProducts } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [rating, setRating] = useState(-1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showNoClassifications, setShowNoClassifications] = useState(false);

  useEffect(() => {
    const filtered =
      allProducts &&
      allProducts.filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const shopNameMatch = product.shop.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const categoryMatch = product.category
          .toLowerCase()
          .includes(query.toLowerCase());
        const subcategoryMatch = product.subcategory
          .toLowerCase()
          .includes(query.toLowerCase());
        const subclassificationMatch = product.subclassification
          .toLowerCase()
          .includes(query.toLowerCase());

        // Get the lowest price from classifications
        const lowestPrice = product.classifications.length > 0
          ? Math.min(...product.classifications.map((c) => parseInt(c.price, 10)))
          : parseInt(product.price, 10);

        const priceMatch =
          lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];

        const ratingMatch = rating === -1 || product.ratings >= rating;

        const classificationMatch = showNoClassifications
          ? !product.hasClassifications
          : true;

        return (
          (nameMatch ||
            shopNameMatch ||
            categoryMatch ||
            subcategoryMatch ||
            subclassificationMatch) &&
          priceMatch &&
          ratingMatch &&
          classificationMatch
        );
      });

    // Sắp xếp sản phẩm
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "bestSelling":
        filtered.sort((a, b) => b.sold_out - a.sold_out);
        break;
      case "priceLowToHigh":
        filtered.sort((a, b) => {
          const aPrice = a.classifications.length > 0
            ? Math.min(...a.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(a.price, 10);
          const bPrice = b.classifications.length > 0
            ? Math.min(...b.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(b.price, 10);
          return aPrice - bPrice;
        });
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => {
          const aPrice = a.classifications.length > 0
            ? Math.max(...a.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(a.price, 10);
          const bPrice = b.classifications.length > 0
            ? Math.max(...b.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(b.price, 10);
          return bPrice - aPrice;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [query, allProducts, priceRange, rating, sortBy, showNoClassifications]);

  // Hàm xử lý lọc theo giá
  const handlePriceFilter = () => {
    const min = minPrice === "" ? 0 : parseInt(minPrice, 10);
    const max = maxPrice === "" ? 1000000000 : parseInt(maxPrice, 10);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    } else {
      alert("Vui lòng nhập khoảng giá hợp lệ.");
    }
  };

  // Hàm thiết lập khoảng giá theo preset
  const setPriceRangePreset = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
    setPriceRange([min, max]);
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1300px] mx-auto flex bg-white border rounded-lg m-4">
        {/* Bảng filter */}
        <div className="w-1/5 p-4">
          <div className="flex items-center m-4">
            <Filter size={20} />
            <h3 className="text-lg font-semibold ml-4">Bộ Lọc Tìm Kiếm</h3>
          </div>
          <Separator />
          {/* Filter khoảng giá */}
          <div className="mb-4">
            <label className="block font-semibold my-4">Khoảng giá</label>
            <div className="flex items-center mb-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Giá từ"
                className="w-1/2 p-2 border rounded mr-2"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Đến giá"
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <button
              onClick={handlePriceFilter}
              className="w-full p-2 bg-[#27b3e2] text-white rounded"
            >
              Áp dụng
            </button>
          </div>

          {/* Các nút khoảng giá */}
          <div className="mb-4">
            <button
              onClick={() => setPriceRangePreset(0, 100000)}
              className="m-1 p-2 border rounded"
            >
              Dưới 100k
            </button>
            <button
              onClick={() => setPriceRangePreset(100000, 500000)}
              className="m-1 p-2 border rounded"
            >
              100k - 500k
            </button>
            <button
              onClick={() => setPriceRangePreset(500000, 1000000)}
              className="m-1 p-2 border rounded"
            >
              500k - 1tr
            </button>
            <button
              onClick={() => setPriceRangePreset(1000000, 1000000000)}
              className="m-1 p-2 border rounded"
            >
              Trên 1tr
            </button>
          </div>

          <Separator />

          {/* Filter đánh giá */}
          <div className="mb-4">
            <label className="block font-semibold my-4">Đánh giá</label>
            <div className="flex flex-col">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`flex items-center p-2 ${
                    rating === star ? "bg-[#27b3e2] text-white" : ""
                  }`}
                >
                  {[...Array(star)].map((_, index) => (
                    <span key={index} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="ml-2">trở lên</span>
                </button>
              ))}
              <button
                onClick={() => setRating(-1)}
                className={`p-2 ${
                  rating === -1 ? "bg-[#27b3e2] text-white" : ""
                }`}
              >
                Tất cả đánh giá
              </button>
            </div>
          </div>
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="w-4/5 p-4">
          {/* Nút sắp xếp */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <button
                onClick={() => setSortBy("newest")}
                className={`mr-2 p-2 border rounded ${
                  sortBy === "newest" ? "bg-[#27b3e2] text-white" : ""
                }`}
              >
                Mới nhất
              </button>
              <button
                onClick={() => setSortBy("bestSelling")}
                className={`mr-2 p-2 border rounded ${
                  sortBy === "bestSelling" ? "bg-[#27b3e2] text-white" : ""
                }`}
              >
                Bán chạy
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Sắp xếp theo</option>
              <option value="priceLowToHigh">Giá từ thấp đến cao</option>
              <option value="priceHighToLow">Giá từ cao đến thấp</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Kết quả tìm kiếm cho "{query}"
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))
            ) : (
              <p className="col-span-5">Không tìm thấy sản phẩm nào phù hợp.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;

