import SwiperSection from "../sections/home_sections/SwiperSection";
import AllProducts from "../sections/menu_sections/AllProducts";
import SearchBar from "../sections/menu_sections/SearchBar";

const MenuPage = () => {
  return (
    <div>
      <SearchBar />
      <SwiperSection styling={"!py-0"} />
      <AllProducts />
    </div>
  );
};

export default MenuPage;
