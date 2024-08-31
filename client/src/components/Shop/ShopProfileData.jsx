import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import { backend_url } from "../../server";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Pagination } from "../ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { categoriesData } from "../../static/data";
import moment from "moment-timezone";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";
import { Input } from "../ui/input";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const [activeTab, setActiveTab] = useState("all");
  const [activeReviewTab, setActiveReviewTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceSort, setPriceSort] = useState("lowToHigh");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  // Cấu hình Fuse.js
  const fuse = new Fuse(products, {
    keys: ["name"],
    threshold: 0.3,
  });

  // Debounced search function
  const debouncedSearch = debounce((term) => {
    if (term.trim() === "") {
      setSearchResults([]);
      setShowNoResults(false);
    } else {
      const results = fuse.search(term);
      setSearchResults(results.map((result) => result.item));
      // Sử dụng timeout để trì hoãn việc hiển thị thông báo "Không tìm thấy sản phẩm"
      setTimeout(() => {
        setShowNoResults(results.length === 0);
      }, 300); // Điều chỉnh thời gian này nếu cần
    }
    setIsSearching(false);
  }, 300);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearching(true);
    debouncedSearch(term);
  };

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(1);

  const getUniqueCategories = () => {
    const categories = products?.map((product) => product.category) || [];
    return [...new Set(categories)];
  };

  const uniqueCategories = getUniqueCategories();

  const filterProducts = () => {
    if (!Array.isArray(products)) {
      return [];
    }

    let filteredProducts = searchTerm ? searchResults : [...products];

    if (activeTab === "flashSale") {
      return Array.isArray(events) ? events : [];
    } else if (activeTab !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === activeTab
      );
    }

    if (sortBy === "newest") {
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "bestSelling") {
      filteredProducts.sort((a, b) => b.sold_out - a.sold_out);
    }

    if (priceSort === "lowToHigh") {
      filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (priceSort === "highToLow") {
      filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const filterReviews = (reviews, stars) => {
    if (stars === "all") return reviews;
    return reviews.filter((review) => review.rating === parseInt(stars));
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm sản phẩm trong shop"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="w-full">
            Tất cả sản phẩm
          </TabsTrigger>
          <TabsTrigger value="flashSale" className="w-full">
            Flash sale
          </TabsTrigger>
          {uniqueCategories.slice(0, 3).map((categoryId) => {
            const category = categoriesData.find(
              (cat) => cat.id === parseInt(categoryId)
            );
            return (
              <TabsTrigger
                key={categoryId}
                value={categoryId.toString()}
                className="w-full"
              >
                {category ? category.title : `Category ${categoryId}`}
              </TabsTrigger>
            );
          })}
          {uniqueCategories.length > 3 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Thêm</Button>
              </PopoverTrigger>
              <PopoverContent>
                {uniqueCategories.slice(3).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </PopoverContent>
            </Popover>
          )}
          <TabsTrigger value="reviews" className="w-full">
            Đánh giá
          </TabsTrigger>
        </TabsList>

        {activeTab !== "reviews" && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <Button className="mr-2" onClick={() => setSortBy("newest")}>
                Mới nhất
              </Button>
              <Button onClick={() => setSortBy("bestSelling")}>Bán chạy</Button>
            </div>
            <div>
              <Select onValueChange={setPriceSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sắp xếp theo giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowToHigh">Giá thấp đến cao</SelectItem>
                  <SelectItem value="highToLow">Giá cao đến thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <TabsContent value="all">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-5 xl:gap-2 mt-4">
            {isSearching ? (
              <p className="col-span-5 text-center">Đang tìm kiếm...</p>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <ProductCard key={index} data={product} isShop={true} />
              ))
            ) : showNoResults ? (
              <p className="col-span-5 text-center">
                Không tìm thấy sản phẩm hoặc từ khóa phù hợp.
              </p>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="flashSale">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-5 xl:gap-2 mt-4">
            {events &&
              events.map((event, index) => (
                <ProductCard
                  key={index}
                  data={event}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
        </TabsContent>

        {uniqueCategories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-5 xl:gap-2 mt-4">
              {currentProducts
                .filter((product) => product.category === category)
                .map((product, index) => (
                  <ProductCard key={index} data={product} isShop={true} />
                ))}
            </div>
          </TabsContent>
        ))}

        <TabsContent value="reviews">
          <Tabs value={activeReviewTab} onValueChange={setActiveReviewTab}>
            <TabsList className="w-full min-h-[6rem] border p-4 mb-4 bg-[#fffbf8]">
              <div className="w-full mx-2 h-[80px] flex flex-col items-center justify-center mr-6 ">
                <div className="flex items-center text-[#27b3e2] font-[450] mb-1">
                  <p className="text-[22px] mr-1 ">{averageRating}</p>
                  <p>trên 5</p>
                </div>
                <div className="text-[22px]">
                  <Ratings rating={parseFloat(averageRating)} />
                </div>
              </div>
              <TabsTrigger
                value="all"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="5"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                5 sao
              </TabsTrigger>
              <TabsTrigger
                value="4"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                4 sao
              </TabsTrigger>
              <TabsTrigger
                value="3"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                3 sao
              </TabsTrigger>
              <TabsTrigger
                value="2"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                2 sao
              </TabsTrigger>
              <TabsTrigger
                value="1"
                className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
              >
                1 sao
              </TabsTrigger>
            </TabsList>
            <div>
              {filterReviews(allReviews, activeReviewTab)?.map(
                (review, index) => {
                  // Tìm sản phẩm tương ứng với review
                  const product = products.find(
                    (p) => p._id === review.productId
                  );

                  return (
                    <div key={index} className="flex items-start p-3 border-b">
                      <img
                        src={`${backend_url}${review.user.avatar}`}
                        alt=""
                        className="size-[50px] rounded-full object-cover mr-3"
                      />
                      <div className="flex-grow">
                        <div className="w-full">
                          <h1 className="font-[500]">{review.user.name}</h1>
                          <div className="flex items-center !justify-start mt-[6px]">
                            <Ratings rating={review.rating} />
                          </div>
                          <div>
                            <p className="text-[13px] font-[450] text-[#0000008a] my-[6px]">
                              {moment(review.createdAt)
                                .tz("Asia/Ho_Chi_Minh")
                                .format("DD-MM-YYYY HH:mm")}
                            </p>
                          </div>
                        </div>
                        <p>{review.comment}</p>

                        {/* Hiển thị thông tin sản phẩm */}
                        {product && (
                          <div className="flex items-start mt-3 w-[350px] h-[55px] bg-[#f5f5f5] rounded">
                            <img
                              src={`${backend_url}${product.images[0]}`}
                              alt={product.name}
                              className="size-[55px] object-cover rounded"
                            />
                            <p className="font-[450] text-[14px] text-ellipsis overflow-hidden flex-nowrap p-2">
                              {product.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Tabs>
        </TabsContent>
      </Tabs>

      {filteredProducts.length > productsPerPage && (
        <Pagination
          className="mt-4"
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default ShopProfileData;
