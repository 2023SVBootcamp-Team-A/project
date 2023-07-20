import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenreBox from '../components/Box/GenreBox';
import GenreKeywords from '../components/Box/GenreKeywords';
// import MiddleBoxEra from '../components/Box/MiddleBoxEra';
// import MiddleBoxKeywords from '../components/Box/MiddleBoxKeywords';
// import RightBoxBackground from '../components/Box/RightBoxBackground';
// import RightBoxKeywords from '../components/Box/RightBoxKeywords';

// interface SettingPageFirstProps {
//   // Define any props specific to SettingPageFirst here, if needed.
// }

const SettingPageFirst: React.FC = () => {
    const navigate = useNavigate();

    const [genre, setGenre] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

    const [background, setBackground] = useState<string[]>([]);
    const [selectedBackground, setSelectedBackground] = useState<string[]>([]);
    
    const [era, setEra] = useState<string[]>([]);
    const [selectedEra, setSelectedEra] = useState<string[]>([]);
 
    const handleNextPageClick = () => {
      navigate('/setting');
  };

  const handleGenreClick = (genre: string) => {
    setSelectedGenre((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  const handleGenreKeywordSubmit = () => {
    if (genre.trim() !== '') {
      setSelectedGenre((prevGenres) => [...prevGenres, genre.trim()]);
      setGenre('');
    }
  };

  const handleGenreKeywordClick = (keyword: string) => {
    setSelectedGenre((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords;
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };


  const handleBackgroundClick = (keyword: string) => {
    setSelectedBackground((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords;
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };

  const handleBackgroundKeywordClick = (background: string) => {
    setSelectedBackground((prevBackgrounds) => {
      if (prevBackgrounds.includes(background)) {
        return prevBackgrounds.filter((b) => b !== background);
      } else {
        return [...prevBackgrounds, background];
      }
    });
  };

  const handleEraClick = (era: string) => {
    setEra((prevEra) => {
      if (prevEra.includes(era)) {
        return prevEra.filter((e) => e !== era);
      } else {
        return [...prevEra, era];
      }
    });
  };

  const handleEraKeywordClick = (keyword: string) => {
    setSelectedEra((prevKeywords) => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords;
      } else {
        return [...prevKeywords, keyword];
      }
    });
  };
  

  const handleBackgroundKeywordSubmit = (keyword: string) => {
    setSelectedBackground((prevKeywords) => [...prevKeywords, keyword]);
  };

  const handleEraKeywordSubmit = (keyword: string) => {
    setSelectedEra((prevKeywords) => [...prevKeywords, keyword]);
  };

  return (  
    <div className="min-h-screen flex flex-col mt-20 p-8">
    <div className="text-5xl font-bold text-center text-[#6B3A18]">Sketch Story</div>
    <div className="h-5/6 w-5/6 bg-[#E9E7E4] flex flex-row p-4 mx-auto mt-10 mb-2 rounded-2xl">
    <div className="flex-1 mx-8">
          <div className="bg-white p-4 mb-4 rounded-xl">
          <div className="text-xl font-bold mb-2"> 장르 </div>          
          <GenreBox
              selectedGenres={selectedGenre}
              onGenreClick={handleGenreClick}
              onGenreSubmit={handleGenreKeywordSubmit}
              />
            <GenreKeywords
              selectedGenres={selectedGenre}
              onKeywordClick={handleGenreKeywordClick}
            />
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="bg-white p-4 mb-4 rounded-xl">
            <div className="text-xl font-bold mb-2"> 배경 </div>
            {/* Add content for Middle Box */}
          </div>
        </div>
        <div className="flex-1 mx-8">
          <div className="bg-white p-4 mb-4 rounded-xl">
            <div className="text-xl font-bold mb-2"> 시대 </div>
            {/* Add content for Right Box */}
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

