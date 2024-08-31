import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { Separator } from "../components/ui/separator";
import { ChevronRight, ChevronUp, List } from "lucide-react";

const ProductsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const subcategoryData = searchParams.get("subcategory");
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [rating, setRating] = useState(-1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [activeSubclassification, setActiveSubclassification] = useState(null);

  const category = location.state?.category;

  useEffect(() => {
    if (location.state) {
      if (location.state.activeCategory) {
        setActiveCategory(location.state.activeCategory);
      }
      if (location.state.activeSubcategory) {
        setActiveSubcategory(location.state.activeSubcategory);
        setOpenSubcategory(location.state.activeSubcategory);
      }
      if (location.state.activeSubclassification) {
        setActiveSubclassification(location.state.activeSubclassification);
      }
    }
  }, [location.state]);

  useEffect(() => {
    let filteredData = allProducts;

    if (categoryData) {
      filteredData = filteredData.filter((i) => i.category === categoryData);
    }

    if (subcategoryData) {
      filteredData = filteredData.filter(
        (i) => i.subcategory === subcategoryData
      );
    }

    const subclassificationData = searchParams.get("subclassification");
    if (subclassificationData) {
      filteredData = filteredData.filter(
        (i) => i.subclassification === subclassificationData
      );
    }

    filteredData = filteredData.filter((i) => i.hasClassifications || i.price);
    setData(filteredData);
  }, [allProducts, categoryData, subcategoryData, searchParams]);

  useEffect(() => {
    let filtered = data?.filter((product) => {
      let price;
      if (product.hasClassifications) {
        price = Math.min(
          ...product.classifications.map((c) => parseInt(c.price, 10))
        );
      } else {
        price = parseInt(product.price, 10);
      }
      const priceMatch = price >= priceRange[0] && price <= priceRange[1];
      const ratingMatch = rating === -1 || product.ratings >= rating;
      return priceMatch && ratingMatch;
    });

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "bestSelling":
        filtered.sort((a, b) => b.sold_out - a.sold_out);
        break;
      case "priceLowToHigh":
        filtered.sort((a, b) => {
          const priceA = a.hasClassifications
            ? Math.min(...a.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(a.price, 10);
          const priceB = b.hasClassifications
            ? Math.min(...b.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(b.price, 10);
          return priceA - priceB;
        });
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => {
          const priceA = a.hasClassifications
            ? Math.max(...a.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(a.price, 10);
          const priceB = b.hasClassifications
            ? Math.max(...b.classifications.map((c) => parseInt(c.price, 10)))
            : parseInt(b.price, 10);
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [data, priceRange, rating, sortBy]);

  const handlePriceFilter = () => {
    const min = minPrice === "" ? 0 : parseInt(minPrice, 10);
    const max = maxPrice === "" ? 1000000000 : parseInt(maxPrice, 10);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    } else {
      alert("Vui lòng nhập khoảng giá hợp lệ.");
    }
  };

  const setPriceRangePreset = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
    setPriceRange([min, max]);
  };

  const handleCategoryClick = () => {
    if (activeCategory === category.id) {
      setActiveCategory(null);
      setData(allProducts);
    } else {
      setActiveCategory(category.id);
      setData(
        allProducts.filter(
          (product) => product.category === category?.id?.toString()
        )
      );
    }
    setActiveSubcategory(null);
    setOpenSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    if (activeSubcategory === subcategory.id) {
      setActiveSubcategory(null);
      setOpenSubcategory(null);
      setData(
        allProducts.filter(
          (product) => product.category === category?.id?.toString()
        )
      );
    } else {
      setActiveSubcategory(subcategory.id);
      setOpenSubcategory(subcategory.id);
      setData(
        allProducts.filter(
          (product) => product.subcategory === subcategory.id.toString()
        )
      );
    }
    setActiveCategory(null);
    setActiveSubclassification(null);
  };

  const handleSubclassificationClick = (subclassification) => {
    setActiveSubclassification(subclassification.id);
    setData(
      allProducts.filter(
        (product) =>
          product.subclassification === subclassification.id.toString()
      )
    );
  };

  return (
    <div className="w-full">
      <Header />
      <div className="w-[1300px] mx-auto flex bg-white border rounded-lg m-4">
        <div className="w-1/5 p-4">
          <div className="flex items-center m-4">
            <List />
            <Link to="/">
              <h3 className="font-semibold ml-4">Tất Cả Danh Mục</h3>
            </Link>
          </div>
          <Separator />
          {category && (
            <div className="py-2 text-[15px]">
              <div
                className={`flex flex-row items-center cursor-pointer p-2 hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200 ${
                  activeCategory === category.id ? "text-[#27b3e2]" : ""
                }`}
                onClick={handleCategoryClick}
              >
                {activeCategory === category.id ? (
                  <ChevronRight size={15} className="mr-2 flex-shrink-0" />
                ) : (
                  <div className="w-[15px] mr-2 flex-shrink-0"></div>
                )}
                <h3 className="font-[600] ">{category.title}</h3>
              </div>
              {category.subcategories &&
                category.subcategories.map((subcategory) => (
                  <div key={subcategory.id}>
                    <div
                      className={`flex flex-row border-t items-center justify-between cursor-pointer p-2 hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200  
                      ${
                        activeSubcategory === subcategory.id
                          ? "text-[#27b3e2]"
                          : ""
                      }`}
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      <div className="flex flex-row items-center">
                        {activeSubcategory === subcategory.id ? (
                          <ChevronRight
                            size={15}
                            className="mr-2 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-[15px] mr-2 flex-shrink-0"></div>
                        )}
                        <div className="!w-[160px]">
                          <h3 className="font-normal ">{subcategory.title}</h3>
                        </div>
                      </div>
                      {subcategory.subclassifications && (
                        <ChevronUp
                          size={15}
                          className={`flex-shrink-0 transition-transform duration-300 ${
                            openSubcategory === subcategory.id
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                    {openSubcategory === subcategory.id &&
                      subcategory.subclassifications && (
                        <div className="ml-4">
                          {subcategory.subclassifications.map(
                            (subclassification) => (
                              <div
                                key={subclassification.id}
                                className={`flex flex-row items-center cursor-pointer p-2 hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200 ${
                                  activeSubclassification ===
                                  subclassification.id
                                    ? "text-[#27b3e2]"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSubclassificationClick(
                                    subclassification
                                  )
                                }
                              >
                                {activeSubclassification ===
                                subclassification.id ? (
                                  <ChevronRight
                                    size={15}
                                    className="mr-2 flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-[15px] mr-2 flex-shrink-0"></div>
                                )}
                                <h3 className="font-[300]">
                                  {subclassification.title}
                                </h3>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
            </div>
          )}
          <Separator />
          <h3 className="font-semibold my-4 ">Bộ lọc</h3>

          {/* Filter khoảng giá */}
          <div className="mb-4">
            <label className="block mb-2">Khoảng giá</label>
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

        {/* Danh sách sản phẩm */}
        <div className="w-4/5 p-4">
          {/* Nút sắp xếp */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <p className="mr-2">Sắp xếp theo</p>
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

          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-4">
            {filteredProducts &&
              filteredProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
          {filteredProducts && filteredProducts.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              Không tìm thấy sản phẩm nào!
            </h1>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
