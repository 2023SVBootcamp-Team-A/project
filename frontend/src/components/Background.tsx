import React, { Children, ReactNode } from "react";
import styled from "styled-components";

export const BackgroundImg = styled.div`
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface props {
  children: React.ReactNode;
}
export default ({ children }: props) => {
  return (
    <div
      className="w-screen h-screen min-h-screen relative bg-no-repeat bg-top bg-cover overflow-scroll"
      style={{
        backgroundImage: `url(/images/background.png)`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};
