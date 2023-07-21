import React, { useState } from 'react';
import addLogo from "/images/add.png";

interface BackgroundBoxProps {
  selectedBackgrounds: string[];
  onBackgroundClick: (genre: string) => void;
  onBackgroundSubmit: (genre: string) => void;
}

const BackgroundBox: React.FC<BackgroundBoxProps> = ({ selectedBackgrounds, onBackgroundClick, onBackgroundSubmit }) => {
 
  const predefinedBackgrounds = ['한국', '미국', '영국','독일', '로마', '일본','회사','고등학교','대학교','길거리','집','숲 속','내 마음속']; 
  
  const [newBackground, setNewBackground] = useState('');
  const [enterPressed, setEnterPressed] = useState(false);
  const [predefinedBackgroundsState, setPredefinedBackgroundsState] = useState<string[]>(predefinedBackgrounds);
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewBackground(event.target.value);
    }
  };

  const handleAddBackground = () => {
    if (newBackground.trim() !== '') {
      onBackgroundSubmit(newBackground.trim());
      setNewBackground('');
    }
  };

  const handleBackgroundClick = (background: string) => {
    if (selectedBackgrounds.includes(background)) {
      onBackgroundClick(background);
    } else {
      if (!predefinedBackgrounds.includes(background)) {
        onBackgroundClick(background);
      }
    }
  };

  const handlePredefinedBackgroundClick = (background: string) => {
    setPredefinedBackgroundsState((prevState) => {
      if (selectedBackgrounds.includes(background)) {
        return prevState;
      } else {
        return prevState.includes(background)
          ? prevState.filter((g) => g !== background) 
          : [...prevState, background]; 
      }
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddBackground();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderBackgroundButtons = () => {
    return predefinedBackgrounds.map((background, index) => (
      <div
        key={index}
        style={{
          width: '78.6px',
          height: '40.1px',
          backgroundColor: predefinedBackgroundsState.includes(background) ? '#E3DDD7' : '#9B8F8F',
          borderRadius: '20px',
          margin: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handlePredefinedBackgroundClick(background)}
      >
        <p style={{ color: predefinedBackgroundsState.includes(background) ? '#000000' : '#ffffff' }}>{background}</p>
      </div>
    ));
  };

  const renderSelectedBackgrounds = () => {       
    if (selectedBackgrounds.length > 0) {
      return selectedBackgrounds.map((background, index) => (
        <div
          key={index}
          style={{
            width: '78.6px',
            height: '40.1px',
            backgroundColor: selectedBackgrounds.includes(background) ? '#9B8F8F' : '#E3DDD7',
            borderRadius: '20px',
            margin: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleBackgroundClick(background)}
        >
          <p style={{ color: selectedBackgrounds.includes(background) ? '#FFFFF' : '#000000' }}>{background}</p>
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
        <p style={{ color: '#FFFFFF', fontSize: '20px', marginLeft: '-10px'}}>배경</p>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', flex: '1' }}>
          <input
            type="text"
            value={newBackground}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="원하는 배경을 추가하세요"
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
            onClick={handleAddBackground}
          >
          <img src={addLogo} alt="추가 버튼" className="w-8 h-7" />
          </button>
          </div>
        </div>
      </div>
      <div style={{ width: 'auto', height: 'auto', backgroundColor: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderBackgroundButtons()}
        {renderSelectedBackgrounds()}         
      </div>
    </div>
  );
};

export default BackgroundBox;  