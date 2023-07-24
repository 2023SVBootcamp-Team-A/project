import { useState } from "react";
import icon_door from ".././assets/icon_door.png";
import icon_book from ".././assets/icon_book.png";
import icon_user from ".././assets/icon_user.png";
import icon_next from ".././assets/icon_next.png";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [slides, setSlides] = useState([
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/1.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/2.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/3.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/4.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/5.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/6.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/7.jpg",
      caption: "Slide 1",
    },
    {
      image:
        "https://raw.github.com/peterwestendorp/shelves/master/photos/8.jpg",
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
    <div className="mainPage">
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
      <button
        className="startButton"
        onClick={() => {
          navigate("/settingfirst");
        }}
      >
        <p>Click to Start</p>
      </button>
      {/* 로그인 회원가입 마이페이지 */}
      <div className="btnGroup">
        {/* 로그인 */}
        <div
          className="button"
          onClick={() => {
            navigate("/login");
          }}
        >
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
        <div
          className="button"
          onClick={() => {
            navigate("/signup");
          }}
        >
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
        <div
          className="button"
          onClick={() => {
            navigate("/bookshelf");
          }}
        >
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
      <div>설마 진짜 되나?</div>
    </div>
  );
}
