import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/authActions";
import icon_door from ".././assets/icon_door.png";
import icon_book from ".././assets/icon_book.png";
import icon_user from ".././assets/icon_user.png";
import icon_next from ".././assets/icon_next.png";
import { useNavigate } from "react-router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import * as Sentry from "@sentry/react";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./MainPage.css";

import { Provider, useSelector } from "react-redux";
import store from "../redux/store";

export default function MainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 로직.
    // localStorage에 로그인 정보가 남아있으면 redux의 로그인 상태를 true로 한다.
    if (localStorage.getItem("id") !== null) {
      dispatch(loginSuccess());
    }
  }, []);

  const [slides, setSlides] = useState([
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-27-23-36-23_7157.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-03-20-02_2480.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-03-10-19_2505.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-03-07-49_2781.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-02-52-28_2399.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-02-32-35_4155.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-02-31-39_7409.png",
      caption: "Slide 1",
    },
    {
      image:
        "https://team-a-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/2023-07-28-02-20-24_7899.png",
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
        <div className="swiper-text text-4xl font-['DoublePica']">
          Make your World
        </div>
        {/* <!-- Additional required wrapper --> */}
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
            // type: "fraction",
          }}
          loop={true}
          autoplay={{ delay: 3000 }} // 자동재생! (3초 지연 시간 설정)
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
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
        type="button"
        className="px-12 py-3 mb-10 ml-4 rounded-full text-white text-2xl bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
        onClick={() => {
          if (authState.isLoggedIn) {
            navigate("/settingfirst");
          } else {
            alert("로그인이 필요합니다.");
            navigate("/login");
          }
        }}
      >
        Click to Start
      </button>

      {/* 로그인 회원가입 마이페이지 */}
      <div className="btnGroup">
        {authState.isLoggedIn ? (
          <>
            {/* 로그아웃 */}
            <div
              className="button"
              onClick={() => {
                // localStorage.removeItem("id");
                // dispatch(logout());
                // alert("로그아웃되었습니다.");
                navigate("/logout");
              }}
            >
              <img
                src={icon_user}
                id="userIcon"
                className="btnIcon"
                alt="userIcon"
              />
              <p>Logout</p>
              <img src={icon_next} className="iconNext" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        {authState.isLoggedIn ? (
          <></>
        ) : (
          <>
            {/* 회원가입 */}
            <div
              className="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <img
                src={icon_door}
                id="joinIcon"
                className="btnIcon"
                alt="joinIcon"
              />
              <p>Join</p>
              <img src={icon_next} className="iconNext" />
            </div>
          </>
        )}
        {authState.isLoggedIn ? (
          <>
            {/* 마이페이지 */}
            <div
              className="button"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <img
                src={icon_book}
                id="bookshelfIcon"
                className="btnIcon"
                alt="bookshelfIcon"
              />
              <p>MyPage</p>
              <img src={icon_next} className="iconNext" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* <div
        onClick={() => {
          console.log(localStorage.getItem("id"));
          console.log(authState);
        }}
      >
        로그인됐나요?
      </div> */}
    </div>
  );
}
