// import { useSelector } from "react-redux";
// import EventCard from "./EventCard";
// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
// import { Link } from "react-router-dom";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../ui/carousel";
// import { ChevronRight } from "lucide-react";

// const Events = () => {
//   const [data, setData] = useState([]);
//   const { allEvents, isLoading } = useSelector((state) => state.event);

//   useEffect(() => {
//     const allEventsData = allEvents ? [...allEvents] : [];
//     const sortedData = allEventsData?.sort((a, b) => b.sold_out - a.sold_out);
//     const firstFifteen = sortedData && sortedData.slice(0, 15);
//     setData(firstFifteen);
//   }, [allEvents]);

//   const chunkedData = data.reduce((resultArray, item, index) => {
//     const chunkIndex = Math.floor(index / 5);
//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = [];
//     }
//     resultArray[chunkIndex].push(item);
//     return resultArray;
//   }, []);

//   return (
//     <div>
//       {!isLoading && (
//         <Card className="mt-2 py-2 px-4">
//           <CardHeader className="!p-0 !py-2 !flex-row !items-center justify-between">
//             <CardTitle className="text-[20px] font-[600]">Flash Sale</CardTitle>
//             <Link to="/events">
//               <CardTitle className="text-[14px] font-[500] !m-0 text-[#27b3e2] flex items-center">
//                 Xem tất cả
//                 <ChevronRight size={15} className="ml-1" />
//               </CardTitle>
//             </Link>
//           </CardHeader>
//           <CardContent className="!px-0">
//             {data && data.length !== 0 ? (
//               <Carousel className="w-full">
//                 <CarouselContent>
//                   {chunkedData.map((chunk, chunkIndex) => (
//                     <CarouselItem key={chunkIndex}>
//                       <div className="grid grid-cols-5 gap-3 justify-items-center">
//                         {chunk.map((event, eventIndex) => (
//                           <EventCard key={eventIndex} data={event} />
//                         ))}
//                       </div>
//                     </CarouselItem>
//                   ))}
//                 </CarouselContent>
//                 <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
//                   <CarouselPrevious className="relative left-2 translate-y-0" />
//                   <CarouselNext className="relative right-2 translate-y-0" />
//                 </div>
//               </Carousel>
//             ) : (
//               <div className="text-center h-[100px] flex items-center justify-center">
//                 Không có sản phẩm nào đang được khuyến mãi
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Events;

import { useSelector } from "react-redux";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { ChevronRight } from "lucide-react";

const Events = () => {
  const [data, setData] = useState([]);
  const { allEvents, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    const allEventsData = allEvents ? [...allEvents] : [];
    const sortedData = allEventsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFifteen = sortedData && sortedData.slice(0, 15);
    setData(firstFifteen);
  }, [allEvents]);

  const chunkedData = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 5);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div>
      {!isLoading && (
        <Card className="mt-2 py-2 px-4">
          <CardHeader className="!p-0 !py-2 !flex-row !items-center justify-between">
            <CardTitle className="text-[20px] font-[600]">Flash Sale</CardTitle>
            <Link to="/events">
              <CardTitle className="text-[14px] font-[500] !m-0 text-[#27b3e2] flex items-center">
                Xem tất cả
                <ChevronRight size={15} className="ml-1" />
              </CardTitle>
            </Link>
          </CardHeader>
          <CardContent className="!px-0">
            {data && data.length !== 0 ? (
              data.length > 5 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {chunkedData.map((chunk, chunkIndex) => (
                      <CarouselItem key={chunkIndex}>
                        <div className="grid grid-cols-5 gap-3 justify-items-center">
                          {chunk.map((event, eventIndex) => (
                            <EventCard key={eventIndex} data={event} />
                          ))}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                    <CarouselPrevious className="relative left-2 translate-y-0" />
                    <CarouselNext className="relative right-2 translate-y-0" />
                  </div>
                </Carousel>
              ) : (
                <div className="grid grid-cols-5 gap-3 justify-items-center">
                  {data.map((event, index) => (
                    <EventCard key={index} data={event} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center h-[100px] flex items-center justify-center">
                Không có sản phẩm nào đang được khuyến mãi
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Events;
