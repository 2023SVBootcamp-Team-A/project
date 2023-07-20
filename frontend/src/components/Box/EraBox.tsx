import React, { useState } from 'react';
import addLogo from "/images/add.png";

interface EraBoxProps {
  selectedEras: string[];
  onEraClick: (era: string) => void;
  onEraSubmit: (era: string) => void;
}

const EraBox: React.FC<EraBoxProps> = ({ selectedEras, onEraClick, onEraSubmit }) => {
 
  const predefinedEras = ['현대', '근대', '미래', '조선', 'ㅇㅇ', '아몰랑']; 
  
  const [newEra, setNewEra] = useState('');
  const [enterPressed, setEnterPressed] = useState(false);
  const [predefinedErasState, setPredefinedErasState] = useState<string[]>(predefinedEras);
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewEra(event.target.value);
    }
  };

  const handleAddEra = () => {
    if (newEra.trim() !== '') {
      onEraSubmit(newEra.trim());
      setNewEra('');
    }
  };

  const handleEraClick = (era: string) => {
    if (selectedEras.includes(era)) {
      onEraClick(era);
    } else {
      if (!predefinedEras.includes(era)) {
        onEraClick(era);
      }
    }
  };

  const handlePredefinedEraClick = (era: string) => {
    setPredefinedErasState((prevState) => {
      if (selectedEras.includes(era)) {
        return prevState;
      } else {
        return prevState.includes(era)
          ? prevState.filter((g) => g !== era) 
          : [...prevState, era]; 
      }
    });
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddEra();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderEraButtons = () => {
    return predefinedEras.map((era, index) => (
      <div
        key={index}
        style={{
          width: '78.6px',
          height: '40.1px',
          backgroundColor: predefinedErasState.includes(era) ? '#E3DDD7' : '#9B8F8F',
          borderRadius: '20px',
          margin: '5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => handlePredefinedEraClick(era)}
      >
        <p style={{ color: predefinedErasState.includes(era) ? '#000000' : '#ffffff' }}>{era}</p>
      </div>
    ));
  };

  const renderSelectedEras = () => {       
    if (selectedEras.length > 0) {
      return selectedEras.map((era, index) => (
        <div
          key={index}
          style={{
            width: '78.6px',
            height: '40.1px',
            backgroundColor: selectedEras.includes(era) ? '#9B8F8F' : '#E3DDD7',
            borderRadius: '20px',
            margin: '5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleEraClick(era)}
        >
          <p style={{ color: selectedEras.includes(era) ? '#FFFFF' : '#000000' }}>{era}</p>
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
        <p style={{ color: '#FFFFFF', fontSize: '20px', marginLeft: '-10px'}}>시대</p>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', flex: '1' }}>
          <input
            type="text"
            value={newEra}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="원하는 시대를 추가하세요"
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
            onClick={handleAddEra}
          >
          <img src={addLogo} alt="추가 버튼" className="w-8 h-7" />
          </button>
          </div>
        </div>
      </div>
      <div style={{ width: 'auto', height: 'auto', backgroundColor: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderEraButtons()}
        {renderSelectedEras()}         
      </div>
    </div>
  );
};

export default EraBox;  