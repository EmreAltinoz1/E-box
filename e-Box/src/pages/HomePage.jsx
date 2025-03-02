import { ChevronLeft, ChevronRight, Download, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setProductList, setTotal, setFetchState } from '../redux/actions/productActions';
import { FETCH_STATES } from '../redux/reducers/productReducer';
import homePageData from "../data/HomePage.json"; // JSON'u import ediyoruz

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function HomePage({ menuOpen }) {
  const dispatch = useDispatch();
  const [menuItems] = useState(homePageData.menu);
  const [bannerItems] = useState(homePageData.banners); // banners array'ini kullan
  const [products] = useState(homePageData.products);
  const [categories] = useState(homePageData.categories);
  const [bestsellerData] = useState(homePageData.bestsellerProducts);
  const [mostPopularData] = useState(homePageData.mostPopular);
  const [categoriesShowcase] = useState(homePageData.categoriesShowcase);

  useEffect(() => {
    // Test için örnek product data dispatch edelim
    console.log("Dispatching test product data...");
    dispatch(setFetchState(FETCH_STATES.FETCHING));
    dispatch(setProductList(products));
    dispatch(setTotal(products.length));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
  }, [dispatch, products]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full bg-white overflow-y-auto">
      {/* Menü Linkleri */}
      <nav className={`flex flex-col py-8 ${menuOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex flex-col items-center space-y-8">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="text-lg text-gray-500 font-medium hover:text-gray-800 transition-colors text-center w-full">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Banner Alanı */}
      <div className="w-full mt-3">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView={1}
          className="h-[638px]" // Banner yüksekliğini sabit tutmak için
        >
          {bannerItems.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40 p-4">
                  <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>
                  <p className="text-lg mb-4 max-w-md">{banner.description}</p>
                  <button className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
         {/* Üst Ürün Kartları */}
      <div className="w-full px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300">
                <p className="text-white text-sm mb-2">{product.title}</p>
                <h3 className="text-white text-2xl font-bold mb-4">{product.subtitle}</h3>
                <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
                  {product.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Kategori ve Bestseller Bölümü - Tek Container */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          {/* Kategori Kartı */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: category.backgroundColor }}
                  >
                    <div className="absolute top-6 left-6">
                      <h3 className="text-[22px] font-bold text-[#23262F]">
                        {category.title}
                      </h3>
                      <p className="text-[14px] text-[#23262F] mt-1">
                        {category.itemCount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Products */}
          <div className="pb-12">
            {/* Başlık ve Kategori Seçimi */}
            <div className="bg-white text-center py-8">
              <h2 className="text-2xl font-bold text-[#252B42] mb-4">{bestsellerData.title}</h2>
              
              <div className="flex flex-col items-center gap-4">
                {/* Kategori Seçimi */}
                <div className="flex items-center gap-8">
                  {bestsellerData.categories.map((category, index) => (
                    <button
                      key={index}
                      className={`text-sm ${index === 0 ? 'text-[#23A6F0]' : 'text-[#737373]'} hover:text-[#23A6F0] transition-colors font-bold`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Swiper Butonları */}
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E8E8E8] text-[#252B42] hover:border-[#23A6F0] hover:text-[#23A6F0] transition-all">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E8E8E8] text-[#252B42] hover:border-[#23A6F0] hover:text-[#23A6F0] transition-all">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Ürün Kartları */}
            <div className="bg-white">
              {bestsellerData.items.map((item, index) => (
                <div key={index} className=" border-[#ECECEC] last:border-b-0">
                  <div className="flex flex-col items-center py-8">
                    <div className="w-[250px] h-[250px] mb-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center w-full px-4 bg-white">
                      <h3 className="text-base font-bold text-[#252B42] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#737373] mb-2">
                        {item.department}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[#BDBDBD] line-through">{item.originalPrice}</span>
                        <span className="text-[#23856D] font-bold">{item.salePrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Most Popular Bölümü */}
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Delivery Man Section */}
          
              <div className="">
                <img
                  src={mostPopularData.sections[0].image}
                  alt={mostPopularData.sections[0].title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{mostPopularData.title}</h2>
                <p className="text-sm text-gray-400 max-w-lg mx-auto">
                  {mostPopularData.description}
                </p>
              </div>
           

            {/* Product Section */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={mostPopularData.sections[1].image}
                  alt={mostPopularData.sections[1].title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="flex items-center justify-center gap-2 mb-4 w-full text-xl font-bold text-[#252B42] mb-2">
                  {mostPopularData.sections[1].title}
                </h3>
                <p className="text-sm text-[#737373] mb-4">
                  {mostPopularData.sections[1].description}
                </p>
                <div className=" flex items-center justify-center gap-2 mb-4 w-full text-sm text-[#737373]">
                  <Download size={20} className="text-[#737373]" />
                  <span>{mostPopularData.sections[1].sales}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                  <span className="text-[#BDBDBD] line-through">{mostPopularData.sections[1].price}</span>
                  <span className="text-[#23856D] font-bold">{mostPopularData.sections[1].salePrice}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4 w-full">
                  <Circle className="w-3 h-3 fill-[#23A6F0] text-[#23A6F0]" />
                  <Circle className="w-3 h-3 fill-[#23856D] text-[#23856D]" />
                  <Circle className="w-3 h-3 fill-[#E77C40] text-[#E77C40]" />
                  <Circle className="w-3 h-3 fill-[#252B42] text-[#252B42]" />
                </div>

                          {/* Features Section */}
                <div className="w-full py-16 bg-white">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {[1, 2, 3, 4].map((number) => (
                        <div key={number} className="flex items-start gap-4">
                          <span className="text-4xl font-bold text-[#E74040]">{number}.</span>
                          <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-[#252B42]">Easy to use</h3>
                            <p className="text-sm text-[#737373]">
                              Things on a very small that you have any<br />
                              direct
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Categories Showcase Section */}
                <div className="w-full py-16">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoriesShowcase.sections.map((section, index) => (
                        <div
                          key={index}
                          className="relative w-[388px] h-[664px] overflow-hidden cursor-pointer"
                        >
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-6 left-6 flex flex-col">
                            <h3 className="text-[22px] font-bold text-[#252B42]">
                              {section.title}
                            </h3>
                            <p className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] mt-1">
                              {section.itemCount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white">
              {bestsellerData.items.map((item, index) => (
                <div key={index} className=" border-[#ECECEC] last:border-b-0">
                  <div className="flex flex-col items-center py-8">
                    <div className="w-[250px] h-[250px] mb-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center w-full px-4 bg-white">
                      <h3 className="text-base font-bold text-[#252B42] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#737373] mb-2">
                        {item.department}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[#BDBDBD] line-through">{item.originalPrice}</span>
                        <span className="text-[#23856D] font-bold">{item.salePrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Main Container */}
            <div className="w-[414px] h-[1175px] bg-white">
              {/* First Image Container */}
              <div className="mb-[35px]">
                <img 
                  src="/images/col-md-woman.png" 
                  alt="Section Image" 
                  className="w-[414px] h-[505px] object-cover"
                />
              </div>
              
              {/* Second Container */}
              <div className="w-[414px] h-[622px] py-12 flex flex-col gap-6">
                {/* Inner Container */}
                <div className="w-[348px] h-[526px] flex flex-col gap-[19px] mx-auto">
                  {/* Most Popular Heading */}
                  <h2 className="w-[200px] h-[32px] font-montserrat font-bold text-[24px] leading-[32px] tracking-[0.1px] text-center mx-auto text-[#252B42]">
                    MOST POPULAR
                  </h2>
                  {/* Description Text */}
                  <p className="w-[280px] h-[60px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center mx-auto text-[#737373]">
                    We focus on ergonomics and meeting<br />
                    you where you work. It's only a<br />
                    keystroke away.
                  </p>
                  {/* Image Container */}
                  <div className="w-[348px] h-[300px]">
                    <div className="pt-[37px]">
                      <img 
                        src="/images/cerez.png" 
                        alt="Cerez" 
                        className="w-[348px] h-[226px] object-cover"
                      />
                    </div>
                  </div>
                  {/* Department Title */}
                  <h3 className="w-[146px] h-[24px] font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center mx-auto text-[#252B42]">
                    English Department
                  </h3>
                  {/* Price Container */}
                  <div className="w-[108px] h-[34px] px-[3px] py-[5px] flex items-center justify-center gap-[5px] mx-auto">
                    <span className="w-[52px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#BDBDBD] line-through">$16.48</span>
                    <span className="w-[45px] h-[24px] font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#23856D]">$6.48</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;