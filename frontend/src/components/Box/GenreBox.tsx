import React, { useState } from "react";
import addLogo from "/images/add.png";

interface GenreBoxProps {
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
  onGenreSubmit: (genre: string) => void;
}

const GenreBox: React.FC<GenreBoxProps> = ({
  selectedGenres,
  onGenreClick,
  onGenreSubmit,
}) => {
  const [newGenre, setNewGenre] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [genres, setGenres] = useState<string[]>([
    "공포",
    "SF",
    "로맨스",
    "판타지",
    "코미디",
    "액션",
    "스포츠",
    "성장",
    "청춘",
    "드라마",
    "스릴러",
    "타임루프",
    "재난",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewGenre(event.target.value);
    }
  };

  const handleAddGenre = () => {
    if (newGenre.trim() !== "") {
      onGenreSubmit(newGenre.trim());
      setGenres([...genres, newGenre.trim()]);
      setNewGenre("");
    }
  };

  const handleGenreClick = (genre: string) => {
    onGenreClick(genre);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
    return genres.map((genre, index) => (
      <div
        className="genreButton"
        key={index}
        style={{
          backgroundColor: selectedGenres.includes(genre)
            ? "#9B8F8F"
            : "#E3DDD7",
          width: "78.6px",
          height: "40.1px",
          borderRadius: "20px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => handleGenreClick(genre)}
      >
        <p
          style={{
            color: selectedGenres.includes(genre) ? "#FFFFFF" : "#000000",
          }}
        >
          {genre}
        </p>
      </div>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "530px",
        background: "white",
        flexDirection: "column",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#C8C0B8",
          padding: "0 18px",
          marginBottom: "2px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        <p style={{ color: "#FFFFFF", fontSize: "20px", marginLeft: "-10px" }}>
          장르
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            flex: "1",
          }}
        >
          <input
            type="text"
            value={newGenre}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="원하는 장르를 추가하세요"
            style={{
              width: "100%",
              height: "44px",
              marginLeft: "10px",
              marginRight: "2px",
              padding: "10px",
              fontSize: "15px",
            }}
          />
          <div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "10px",
                marginRight: "-12px",
              }}
              onClick={handleAddGenre}
            >
              <img src={addLogo} alt="추가 버튼" className="w-8 h-7" />
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "auto",
          height: "auto",
          margin: "17px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderGenreButtons()}
      </div>
    </div>
  );
};

export default GenreBox;
