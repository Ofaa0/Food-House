import { useState } from "react";
import { BiCrosshair, BiSearch, BiCheck } from "react-icons/bi";
import { HiChevronUpDown } from "react-icons/hi2";
import { RiPercentFill, RiEqualizerFill } from "react-icons/ri";
import { LuFilter, LuMapPin, LuTag, LuSlidersHorizontal } from "react-icons/lu";
import { useSearchQuery } from "../../store/zus";

const LOCATIONS = [
  "San Francisco, California",
  "Los Angeles, California",
  "New York City, New York",
  "Austin, Texas",
  "Seattle, Washington",
];

const CATEGORIES = [
  "Best deals",
  "Trending now",
  "Top rated",
  "Free delivery",
  "New arrivals",
];

const SearchBar = () => {
  const [selectedLocation, setSelectedLocation] = useState(
    "San Francisco, California",
  );
  const [selectedCategory, setSelectedCategory] = useState("Best deals");
//   const [searchQuery, setSearchQuery] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const {searchQuery, setSearchQuery} = useSearchQuery();

  return (
    <div className="h-fit bg-gray-50 flex flex-col items-center justify-start p-4 md:p-10 font-sans text-gray-900">
      {/* Container Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8 transition-all">
        {/* Navigation Bar / Search Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Controls Group: Location & Best Deals Dropdowns */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen);
                  setIsCategoryOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-100/80 px-3 py-2 rounded-xl transition-all cursor-pointer group"
              >
                <BiCrosshair className="w-5 h-5 text-gray-900 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {selectedLocation}
                </span>
                <HiChevronUpDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Location Dropdown Menu */}
              {isLocationOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <LuMapPin className="w-3 h-3" /> Select Location
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      <span
                        className={
                          selectedLocation === loc
                            ? "font-bold text-gray-900"
                            : ""
                        }
                      >
                        {loc}
                      </span>
                      {selectedLocation === loc && (
                        <BiCheck className="w-4 h-4 text-black" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category / Best Deals Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsLocationOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-100/80 px-3 py-2 rounded-xl transition-all cursor-pointer group"
              >
                {/* Red Discount Icon Badge */}
                <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                  <RiPercentFill className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {selectedCategory}
                </span>
                <HiChevronUpDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>

              {/* Category Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <LuTag className="w-3 h-3" /> Filter Offers
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between transition-colors"
                    >
                      <span
                        className={
                          selectedCategory === cat
                            ? "font-bold text-gray-900"
                            : ""
                        }
                      >
                        {cat}
                      </span>
                      {selectedCategory === cat && (
                        <BiCheck className="w-4 h-4 text-black" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Controls Group: Search Bar & Filter Toggle Button */}
          <div className="flex items-center gap-3 w-full lg:flex-1 lg:max-w-xl">
            {/* Search Input Pill */}
            <div className="flex-1 flex items-center bg-[#f4f4f5] hover:bg-[#eaeaea] focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10 rounded-2xl px-4 py-2.5 transition-all">
              <BiSearch className="w-5 h-5 text-gray-900 flex-shrink-0" />
              <input
                type="text"
                // value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything..."
                className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-gray-900 placeholder-gray-400 ml-2.5 font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 ml-1 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Black Filter Button */}
            <button
              onClick={() => setIsFilterActive(!isFilterActive)}
              title="Toggle Filters"
              className={`w-11 h-11 md:w-12 md:h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-gray-800 active:scale-95 transition-all shadow-md flex-shrink-0 ${
                isFilterActive ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
            >
              <LuFilter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Display Panel showing search / filter state */}
      {/* <div className="w-full max-w-5xl bg-white border border-gray-100 rounded-2xl p-6 text-center text-gray-500 shadow-xs">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <LuSlidersHorizontal className="w-4 h-4 text-gray-500" /> Current
          Selection Summary
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">
            📍 {selectedLocation}
          </span>
          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
            🏷️ {selectedCategory}
          </span>
          {searchQuery && (
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
              🔍 "{searchQuery}"
            </span>
          )}
          {isFilterActive && (
            <span className="bg-black text-white px-3 py-1 rounded-full font-medium">
              ⚡ Filter Panel Active
            </span>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
