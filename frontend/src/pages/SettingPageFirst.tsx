import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenreBox from '../components/Box/GenreBox';
import GenreKeywords from '../components/Box/GenreKeywords';
import BackgroundBox from '../components/Box/BackgroundBox';
import BackgroundKeywords from '../components/Box/BackgroundKeywords';
import EraBox from '../components/Box/EraBox';
import EraKeywords from '../components/Box/EraKeywords.tsx';

interface NovelData {
  novel_id: string;
}

const SettingPageFirst: React.FC = () => {
    const navigate = useNavigate();

    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]); //선택한 키워드들 값 저장하는 상태변수

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedGenreKeywords, setSelectedGenreKeywords] = useState<string[]>([]);

    const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
    const [selectedBackgroundKeywords, setSelectedBackgroundKeywords] = useState<string[]>([]);
    
    const [selectedEras, setSelectedEras] = useState<string[]>([]);
    const [selectedEraKeywords, setSelectedEraKeywords] = useState<string[]>([]);

    // const handleKeywordsUpdate=(keywords: string[]) => {  //선택한 키워드들 업데이트하는 함수?
    //   setSelectedKeywords(keywords);
    // };

    const handleGenreClick = (genre: string) => {
      setSelectedGenres((prevGenres) => {
        if (prevGenres.includes(genre)) {
          return prevGenres.filter((g) => g !== genre);
      } else {
          return [...prevGenres, genre];
      }
    });
  };

  const handleGenreKeywordClick = (keyword: string) => {
    setSelectedGenreKeywords((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords;
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };

  const handleGenreKeywordSubmit = (keyword: string) => {
      setSelectedGenreKeywords((prevKeywords) => [...prevKeywords, keyword]);
    
    };

    //---//
    const handleBackgroundClick = (background: string) => {
      setSelectedBackgrounds((prevBackgrounds) => {
        if (prevBackgrounds.includes(background)) {
          return prevBackgrounds.filter((g) => g !== background);
      } else {
          return [...prevBackgrounds, background];
      }
    });
  };

  const handleBackgroundKeywordClick = (keyword: string) => {
    setSelectedBackgroundKeywords((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords;
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };

  const handleBackgroundKeywordSubmit = (keyword: string) => {
      setSelectedBackgroundKeywords((prevKeywords) => [...prevKeywords, keyword]);
    
    };

  const handleEraClick = (era: string) => {
  setSelectedEras((prevEras) => {
    if (prevEras.includes(era)) {
      return prevEras.filter((g) => g !== era);
  } else {
      return [...prevEras, era];
  }
});
};

  const handleEraKeywordClick = (keyword: string) => {
  setSelectedEraKeywords((prevKeywords) => {
    if (prevKeywords.includes(keyword)) {
      return prevKeywords;
  } else {
      return [...prevKeywords, keyword];
  }
  });
};

const handleEraKeywordSubmit = (keyword: string) => {
  setSelectedEraKeywords((prevKeywords) => [...prevKeywords, keyword]);

};
    
  const handleNextPageClick = async () => {
    try {
      const apiUrl = 'http://localhost:8000/api/v1/novels/';
      const requestData: NovelData = {
        novel_id: selectedKeywords.join(','),
      };
      const response = await axios.post(apiUrl, requestData);

      if (response.status === 201) {
        console.log('API 응답 데이터:', response.data);
        navigate('/setting',{state: {selectedKeywords}});
      } else {
        console.log('API 요청 실패');
      }
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다', error);
    }
};



  return (  
    <div className="min-h-screen flex flex-col mt-20 p-8">
    <div className="text-5xl font-bold text-center text-[#6B3A18]">Sketch Story</div>
    <div className="h-5/6 w-5/6 bg-[#E9E7E4] flex flex-row p-4 mx-auto mt-5 mb-2 rounded-2xl">
    <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">        
          <GenreBox
              selectedGenres={selectedGenres}
              onGenreClick={handleGenreClick}
              onGenreSubmit={handleGenreKeywordSubmit}
              />
            <GenreKeywords
              selectedKeywords={selectedGenreKeywords}
              onKeywordClick={handleGenreKeywordClick}
            />
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">
          <BackgroundBox
              selectedBackgrounds={selectedBackgrounds}
              onBackgroundClick={handleBackgroundClick}
              onBackgroundSubmit={handleBackgroundKeywordSubmit}
              />
            <BackgroundKeywords
              selectedKeywords={selectedBackgroundKeywords}
              onKeywordClick={handleBackgroundKeywordClick}
            />
          </div>
        </div>
        <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">
          <EraBox
              selectedEras={selectedEras}
              onEraClick={handleEraClick}
              onEraSubmit={handleEraKeywordSubmit}
              />
            <EraKeywords       
              selectedKeywords={selectedEraKeywords}
              onKeywordClick={handleEraKeywordClick}
            />
          </div>
        </div>
      </div>
    {/* 다음버튼 */}
    <div className="h-5/6 w-5/6 mx-auto flex flex-col items-end">
      <button className="px-16 py-3 pr-16 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80" onClick={handleNextPageClick}>
        다음으로
      </button>
    </div>
  </div>

    );
}
  
export default SettingPageFirst;

