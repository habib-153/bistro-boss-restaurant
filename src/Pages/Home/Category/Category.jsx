import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../../../assets/assets/home/slide1.jpg";
import img2 from "../../../assets/assets/home/slide2.jpg";
import img3 from "../../../assets/assets/home/slide3.jpg";
import img4 from "../../../assets/assets/home/slide4.jpg";
import img5 from "../../../assets/assets/home/slide5.jpg";
import { Pagination } from "swiper/modules";
import SectionTitle from "../../../Comnonent/SectionTitle/SectionTitle";
const Category = () => {
  return (
    <section>
      <SectionTitle subHeading={"---From 11:00am to 10:00pm---"} heading={"ORDER ONLINE"}></SectionTitle>
      <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper my-12"
    >
      <SwiperSlide>
        <img src={img1}/>
        <h2 className="text-4xl text-center text-white -mt-16">SALAD</h2>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2}/>
        <h2 className="text-4xl text-center text-white -mt-16">PIZZA</h2>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3}/>
        <h2 className="text-4xl text-center text-white -mt-16">SOUPS</h2>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img4}/>
        <h2 className="text-4xl text-center text-white -mt-16">DESSERTS</h2>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img5}/>
        <h2 className="text-4xl text-center text-white -mt-16">SALAD</h2>
      </SwiperSlide>
      
    </Swiper>
    </section>
    
  );
};

export default Category;
