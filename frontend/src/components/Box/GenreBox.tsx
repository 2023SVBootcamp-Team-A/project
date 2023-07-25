import React, { useState } from 'react';
import addLogo from "/images/add.png";

interface GenreBoxProps {
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
  onGenreSubmit: (genre: string) => void;
}

const GenreBox: React.FC<GenreBoxProps> = ({ selectedGenres, onGenreClick, onGenreSubmit }) => {
 
  const predefinedGenres = ['공포', 'SF', '로맨스', '판타지', '코미디', '액션','스포츠','성장','청춘','드라마','스릴러','타임루프','재난']; 
  
  const [newGenre, setNewGenre] = useState('');
  const [enterPressed, setEnterPressed] = useState(false);
  const [predefinedGenresState, setPredefinedGenresState] = useState<string[]>(predefinedGenres);
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewGenre(event.target.value);
    }
  };

  const handleAddGenre = () => {
    if (newGenre.trim() !== '') {
      onGenreSubmit(newGenre.trim());
      setNewGenre('');
    }
  };

  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenreClick(genre);
    } else {
      if (!predefinedGenres.includes(genre)) {
        onGenreClick(genre);
      }
    }
  };

  const handlePredefinedGenreClick = (genre: string) => {
    setPredefinedGenresState((prevState) => {
      if (selectedGenres.includes(genre)) {
        return prevState;
      } else {
        return prevState.includes(genre)
          ? prevState.filter((g) => g !== genre) 
          : [...prevState, genre]; 
      }
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddGenre();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderGenreButtons = () => {
    return predefinedGenres.map((genre, index) => (
      <div
        key={index}
        style={{
          width: '78.6px',
          height: '40.1px',
          backgroundColor: predefinedGenresState.includes(genre) ? '#E3DDD7' : '#9B8F8F',
          borderRadius: '20px',
          margin: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handlePredefinedGenreClick(genre)}
      >
        <p style={{ color: predefinedGenresState.includes(genre) ? '#000000' : '#ffffff' }}>{genre}</p>
      </div>
    ));
  };

  const renderSelectedGenres = () => {       
    if (selectedGenres.length > 0) {
      return selectedGenres.map((genre, index) => (
        <div
          key={index}
          style={{
            width: '78.6px',
            height: '40.1px',
            backgroundColor: selectedGenres.includes(genre) ? '#9B8F8F' : '#E3DDD7',
            borderRadius: '20px',
            margin: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleGenreClick(genre)}
        >
          <p style={{ color: selectedGenres.includes(genre) ? '#FFFFF' : '#000000' }}>{genre}</p>
        </div>
      ));
    } else {
      return <p></p>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#C8C0B8', padding: '0 18px', marginBottom:'2px',boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)' }}>
        <p style={{ color: '#FFFFFF', fontSize: '20px', marginLeft: '-10px'}}>장르</p>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', flex: '1' }}>
          <input
            type="text"
            value={newGenre}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="원하는 장르를 추가하세요"
            style={{
              width: '100%',
              height: '44px',
              marginLeft: '10px',
              marginRight: '2px',
              padding: '10px',

            }}
          />
          <div>
            <button
            style={{display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '10px', marginRight:'-12px' }}
            onClick={handleAddGenre}
          >
          <img src={addLogo} alt="추가 버튼" className="w-8 h-7" />
          </button>
          </div>
        </div>
      </div>
      <div style={{ width: 'auto', height: 'auto', backgroundColor: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderGenreButtons()}
        {renderSelectedGenres()}         
      </div>
    </div>
  );
};

export default GenreBox;  