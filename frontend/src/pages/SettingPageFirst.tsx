import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreBox from "../components/Box/GenreBox";
import BackgroundBox from "../components/Box/BackgroundBox";
import EraBox from "../components/Box/EraBox";


interface SettingPageFirstProps {
  genre: string;
  time_period: string;
  time_projection: string;
  
}

const SettingPageFirst: React.FC<SettingPageFirstProps> = () => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  const [selectedEras, setSelectedEras] = useState<string[]>([]);


  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
    console.log(genre);
  };

  const handleGenreSubmit = (keyword: string) => {
    setSelectedGenres((prevKeywords) => [...prevKeywords, keyword]);
  };

  //---//
  const handleBackgroundClick = (background: string) => {
    setSelectedBackgrounds((prevBackgrounds) => {
      if (prevBackgrounds.includes(background)) {
        return prevBackgrounds.filter((b) => b !== background);
      } else {
        return [...prevBackgrounds, background];
      }
    });
    console.log(background);
  };

  const handleBackgroundSubmit = (keyword: string) => {
    setSelectedBackgrounds((prevKeywords) => [...prevKeywords, keyword]);
  };

//--//
const handleEraClick = (era: string) => {
  setSelectedEras((prevEras) => {
    if (prevEras.includes(era)) {
      return prevEras.filter((e) => e !== era);
    } else {
      return [...prevEras, era];
    }
  });
  console.log(era);
};

const handleEraSubmit = (keyword: string) => {
  setSelectedEras((prevKeywords) => [...prevKeywords, keyword]);
};


  const handleNextPageClick = () => {
    console.log("선택된 장르 :", selectedGenres);
    console.log("선택된 시대 :", selectedBackgrounds);
    console.log("선택된 배경 :", selectedEras);

    navigate("/setting", {
      state: {
        genre: selectedGenres,
        time_period: selectedEras,
        time_projection: selectedBackgrounds,
      },
    });
  };

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);

  useEffect(() => {
    console.log(selectedBackgrounds);
  }, [selectedBackgrounds]);

  useEffect(() => {
    console.log(selectedEras);
  }, [selectedEras]);


  return (
    <div className="min-h-screen flex flex-col mt-20 p-8">
      <div className="text-5xl font-bold text-center text-[#6B3A18]">
        Sketch Story
      </div>
      <div className="h-5/6 w-5/6 bg-[#E9E7E4] flex flex-row p-4 mx-auto mt-5 mb-2 rounded-2xl">
        <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">
            <GenreBox
              selectedGenres={selectedGenres}
              onGenreClick={handleGenreClick}
              onGenreSubmit={handleGenreSubmit}
            />
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">
            <BackgroundBox
              selectedBackgrounds={selectedBackgrounds}
              onBackgroundClick={handleBackgroundClick}
              onBackgroundSubmit={handleBackgroundSubmit}
            />
          </div>
        </div>
        <div className="flex-1 mx-8">
          <div className="bg-[#E9E7E4] p-4 mb-4 rounded-xl">
            <EraBox
              selectedEras={selectedEras}
              onEraClick={handleEraClick}
              onEraSubmit={handleEraSubmit}
            />
          </div>
        </div>
      </div>
      {/* 다음버튼 */}
      <div className="h-5/6 w-5/6 mx-auto flex flex-col items-end">
        <button
          className="px-16 py-3 pr-16 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
          onClick={handleNextPageClick}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default SettingPageFirst;
