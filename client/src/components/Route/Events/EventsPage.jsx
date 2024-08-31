import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import EventCard from "./EventCard";
import { categoriesData } from "../../../static/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import CategoriesList from "../../Layout/CategoriesList";

const EventsPage = () => {
  const [eventsByCategory, setEventsByCategory] = useState({});
  const [visibleEvents, setVisibleEvents] = useState({});
  const [topCategories, setTopCategories] = useState([]);
  const [categoriesWithEvents, setCategoriesWithEvents] = useState([]);
  const { allEvents, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    if (allEvents) {
      const sortedEvents = [...allEvents].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      const grouped = categoriesData.reduce((acc, category) => {
        const eventsInCategory = sortedEvents.filter(
          (event) => event.category === category.id.toString()
        );
        if (eventsInCategory.length > 0) {
          acc[category.id] = eventsInCategory;
        }
        return acc;
      }, {});
      setEventsByCategory(grouped);

      const initialVisible = Object.keys(grouped).reduce((acc, categoryId) => {
        acc[categoryId] = 8;
        return acc;
      }, {});
      setVisibleEvents(initialVisible);

      // Get categories with events
      const categoriesWithEventsIds = Object.keys(grouped);
      setCategoriesWithEvents(categoriesWithEventsIds);

      // Get top 5 categories with most events
      const sortedCategories = Object.entries(grouped)
        .sort(([, a], [, b]) => b.length - a.length)
        .slice(0, 5)
        .map(([id]) => id);
      setTopCategories(sortedCategories);
    }
  }, [allEvents]);

  const loadMore = (categoryId) => {
    setVisibleEvents((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] + 8,
    }));
  };

  const renderEvents = (events) => (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-6 justify-items-center">
      {events.map((event, index) => (
        <EventCard data={event} key={index} />
      ))}
    </div>
  );

  const getCategoryTitle = (categoryId) => {
    const category = categoriesData.find((c) => c.id.toString() === categoryId);
    return category ? category.title : `Category ${categoryId}`;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="w-[1100px] mx-auto mb-4">
            <div className="w-full flex items-center bg-[#27b3e2] h-[70px]">
              <div className="w-full mx-6 h-full flex items-center justify-center">
                <img
                  alt="icon flash sale"
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/dea74facf15efdbdb982.svg"
                  className="flex items-center justify-center h-[40px]"
                />
              </div>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 w-full !border-none bg-[#27b3e2] h-[60px] !rounded-t-none">
                <TabsTrigger
                  value="all"
                  className="text-white w-full mx-2 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#27b3e2] data-[state=active]:bg-blue-100 data-[state=active]:text-[#27b3e2]"
                >
                  Tất cả sản phẩm
                </TabsTrigger>
                {topCategories.map((categoryId) => (
                  <TabsTrigger
                    key={categoryId}
                    value={categoryId}
                    className="text-white w-full mx-2 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#27b3e2] data-[state=active]:bg-blue-100 data-[state=active]:text-[#27b3e2]"
                  >
                    {getCategoryTitle(categoryId)}
                  </TabsTrigger>
                ))}
                {categoriesWithEvents.length > 5 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground">
                      Thêm <ChevronDown className="ml-2 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/* Hiển thị chỉ các category có sản phẩm sale, bắt đầu từ category thứ 6 */}
                      {categoriesWithEvents.slice(5).map((categoryId) => (
                        <DropdownMenuItem key={categoryId}>
                          <TabsTrigger value={categoryId}>
                            {getCategoryTitle(categoryId)}
                          </TabsTrigger>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TabsList>
              <TabsContent value="all">{renderEvents(allEvents)}</TabsContent>
              {categoriesWithEvents.map((categoryId) => (
                <TabsContent key={categoryId} value={categoryId}>
                  {eventsByCategory[categoryId]?.length > 0 && (
                    <>
                      {renderEvents(
                        eventsByCategory[categoryId].slice(
                          0,
                          visibleEvents[categoryId]
                        )
                      )}
                      {eventsByCategory[categoryId]?.length >
                        visibleEvents[categoryId] && (
                        <div className="flex justify-center">
                          <button
                            onClick={() => loadMore(categoryId)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Xem thêm
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <CategoriesList />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
