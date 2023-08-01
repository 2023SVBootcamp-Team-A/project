import { useState, useEffect } from "react";
import axios from "axios";
import "./Bookshelf.css";
import NovelBook from "../components/NovelBook";
import { useNavigate } from "react-router";

type MyNovels = {
  novel: Novel[];
  meta: Meta;
};

type Meta = {
  page: number;
  pages: number;
  prev_page: number;
  next_page: number;
  has_next: boolean;
  has_prev: boolean;
};

type Novel = {
  id: number;
  novel_name: string;
  novel_image: string;
};

export default function Bookshelf() {
  const navigate = useNavigate();
  const [novelList, setNovelList] = useState<Novel[]>([]);
  const [novelList1, setNovelList1] = useState<Novel[]>([]);
  const [novelList2, setNovelList2] = useState<Novel[]>([]);
  const [metaData, setMetaData] = useState<Meta>();

  // GET 요청 보내기
  const getMyNovels = async (page: number) => {
    const queryString = `?page=${page}`;

    const response = await axios
      // .get(`http://www.techeer-team-a.store:8000/api/v1/novels${queryString}`)
      .get(`http://localhost:8000/api/v1/novels${queryString}`)
      .then(function (response) {
        // 성공적으로 응답 받았을 때 처리하는 로직
        const { novel } = response.data;
        console.log(novel);

        // 내용이 없으면 null 또는 undefined로 들어감!
        const novelList1 = novel.slice(0, 4);
        const novelList2 = novel.slice(4, 8);

        setNovelList(novel); // You can still set the original array if needed
        // Set the individual lists in separate states if required
        setNovelList1(novelList1);
        setNovelList2(novelList2);

        setMetaData(response.data.meta);
      })
      .catch((error) => {
        // 오류 발생 시 처리하는 로직
        console.error("API 요청 중 오류가 발생하였습니다.", error);
      });
  };

  useEffect(() => {
    void getMyNovels(1);
  }, []);

  // Add this useEffect to log the updated novelList whenever it changes
  // useEffect(() => {}, [novelList1, novelList2]);

  useEffect(() => {
    // console.log(metaData);
  }, [metaData]);

  const renderPagination = () => {
    const components = [];

    // metaData가 불러와졌을 때만 동작하도록 if문으로 감싼다.
    if (metaData?.pages) {
      for (let i = 1; i <= metaData?.pages; i++) {
        // 여기에 컴포넌트를 생성하고 components 배열에 추가하는 로직을 구현합니다.
        // 예를 들어, 페이지 번호를 출력하는 단순한 컴포넌트를 생성한다고 가정해보겠습니다.
        if (i === metaData.page) {
          components.push(
            <li
              key={i}
              onClick={() => {
                void getMyNovels(i);
              }}
            >
              <a href="#" aria-current="page" className="navCurrentItem">
                {i}
              </a>
            </li>
          );
        } else {
          components.push(
            <li
              key={i}
              onClick={() => {
                void getMyNovels(i);
              }}
            >
              <a href="#" className="navItem">
                {i}
              </a>
            </li>
          );
        }
      }
    }

    return components;
  };

  return (
    <>
      <div className="title">
        <h1>Bookshelf</h1>
      </div>
      <div className="bookShelf">
        <div className="books-container">
          {novelList1.map((novel) => (
            <NovelBook key={novel.id} novel={novel} />
          ))}
        </div>
        <div className="floor-thickness"></div>
        <div className="books-container">
          {novelList2.map((novel) => (
            <NovelBook key={novel.id} novel={novel} />
          ))}
        </div>
        <div className="floor-thickness"></div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 mt-20">
          {/* <li>
            <a href="#" className="navLeftArrow">
              &lt;
            </a>
          </li> */}
          {/* 페이지 수에 따라 컴포넌트를 렌더링합니다. */}
          {renderPagination()}
          {/* <li>
            <a href="#" className="navRightArrow">
              &gt;
            </a>
          </li> */}
        </ul>
      </nav>
    </>
  );
}
