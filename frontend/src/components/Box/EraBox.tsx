import React, { useState } from "react";
import addLogo from "/images/add.png";

interface EraBoxProps {
  selectedEras: string[];
  onEraClick: (era: string) => void;
  onEraSubmit: (era: string) => void;
}

const EraBox: React.FC<EraBoxProps> = ({
  selectedEras,
  onEraClick,
  onEraSubmit,
}) => {
  const [newEra, setNewEra] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [eras, setEras] = useState<string[]>([
    "현대",
    "근대",
    "미래",
    "중세",
    "르네상스",
    "고대",
    "조선",
    "고려",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewEra(event.target.value);
    }
  };

  const handleAddEra = () => {
    if (newEra.trim() !== "") {
      onEraSubmit(newEra.trim());
      setEras([...eras, newEra.trim()]);
      setNewEra("");
      console.log(eras);
    }
  };

  const handleEraClick = (era: string) => {
    onEraClick(era);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
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
    return eras.map((era, index) => (
      <div
        key={index}
        style={{
          width: "78.6px",
          height: "40.1px",
          backgroundColor: selectedEras.includes(era) ? "#9B8F8F" : "#E3DDD7",
          borderRadius: "20px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => handleEraClick(era)}
      >
        <p
          style={{ color: selectedEras.includes(era) ? "#ffffff" : "#000000" }}
        >
          {era}
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
          시대
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
            value={newEra}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="원하는 시대를 추가하세요"
            style={{
              width: "100%",
              height: "44px",
              marginLeft: "10px",
              marginRight: "2px",
              padding: "10px",
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
              onClick={handleAddEra}
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
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderEraButtons()}
      </div>
    </div>
  );
};

export default EraBox;
