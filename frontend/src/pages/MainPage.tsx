import { useState } from "react";
import icon_door from ".././assets/icon_door.png";
import icon_book from ".././assets/icon_book.png";
import icon_user from ".././assets/icon_user.png";
import icon_next from ".././assets/icon_next.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainPage.css";

export default function MainPage() {
  const [slides, setSlides] = useState([
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
    {
      image: "https://via.placeholder.com/200x350",
      caption: "Slide 1",
    },
  ]);

  // init Swiper:
  // useEffect(() => {
  //   const swiper = new Swiper(".swiper", {
  //     slidesPerView: 3,
  //     spaceBetween: 10,
  //     loop: true,
  //     autoplay: false,
  //   });

  //   return () => {
  //     swiper.destroy();
  //   };
  // }, []);

  return (
    <>
      {/* 캐루셀 */}
      {/* <!-- Slider main container --> */}
      <div className="carousel">
        <div className="swiper-text">Make your World</div>
        {/* <!-- Additional required wrapper --> */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
            // type: "fraction",
          }}
          loop={true}
          autoplay={false}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {/* <!-- Slides --> */}
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={slide.image} alt={slide.caption} />
              {/* <h4>{slide.caption}</h4> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* 시작 버튼 */}
      <div className="startButton">
        <p>Click to Start</p>
      </div>
      {/* 로그인 회원가입 마이페이지 */}
      <div className="btnGroup">
        {/* 로그인 */}
        <div className="button">
          <img
            src={icon_user}
            id="userIcon"
            className="btnIcon"
            alt="userIcon"
          />
          <p>Login</p>
          <img src={icon_next} className="iconNext" />
        </div>
        {/* 회원가입 */}
        <div className="button">
          <img
            src={icon_book}
            id="joinIcon"
            className="btnIcon"
            alt="joinIcon"
          />
          <p>Join</p>
          <img src={icon_next} className="iconNext" />
        </div>
        {/* 마이페이지 */}
        <div className="button">
          <img
            src={icon_door}
            id="bookshelfIcon"
            className="btnIcon"
            alt="bookshelfIcon"
          />
          <p>Bookshelf</p>
          <img src={icon_next} className="iconNext" />
        </div>
      </div>
    </>
  );
}
