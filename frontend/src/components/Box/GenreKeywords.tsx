import React, { useEffect, useState } from 'react';

interface GenreKeywordsProps {
  selectedKeywords: string[];
  onKeywordClick: (keyword: string) => void;
}

const GenreKeywords: React.FC<GenreKeywordsProps> = ({ selectedKeywords, onKeywordClick }) => {
  const [clickedKeywords, setClickedKeywords] = useState<string[]>([]);

  useEffect(() => {
    setClickedKeywords(selectedKeywords);
  }, [selectedKeywords]);

  const handleKeywordClick = (keyword: string) => {
    if (clickedKeywords.includes(keyword)) {
      setClickedKeywords(clickedKeywords.filter((k) => k !== keyword));
    } else {
      setClickedKeywords([...clickedKeywords, keyword]);
    }
    onKeywordClick(keyword);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '350px',
        backgroundColor: '#FFFFFF',
        overflow: 'auto',
        boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '0px 0px 5px 5px',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {selectedKeywords.length > 0 ? (
          selectedKeywords.map((keyword, index) => (
            <div
              key={index}
              style={{
                minWidth: '78.6px',
                height: '40.1px',
                backgroundColor: clickedKeywords.includes(keyword) ? '#E3DDD7' : '#9B8F8F',
                borderRadius: '20px',
                margin: '5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: clickedKeywords.includes(keyword) ? '#000' : '#FFF',
              }}
              onClick={() => handleKeywordClick(keyword)}
            >
              <p>{keyword}</p>
            </div>
          ))
        ) : (
          <div style={{ height: '40.1px' }} />
        )}
      </div>
    </div>
  );
};

export default GenreKeywords;