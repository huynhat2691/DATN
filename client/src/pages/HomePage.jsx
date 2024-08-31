import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Route/Events/Events";
import Footer from "../components/Layout/Footer";
import Banner from "../components/Route/Hero/Banner";
import NavBar from "../components/Layout/NavBar";
import CategoriesList from "../components/Layout/CategoriesList";


const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <div className="flex w-[1300px] mx-auto justify-between">
        <Categories />
        <div className="w-[1050px] my-4">
          <Banner className="" />
          <NavBar />
          <BestDeals />
          <Events />
          <FeaturedProduct />
        </div>
      </div>
      <CategoriesList/>
      <Footer />
    </div>
  );
};

export default HomePage;
