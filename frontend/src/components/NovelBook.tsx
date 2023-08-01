import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Novel = {
  id: number;
  novel_name: string;
  novel_image: string;
};

type novelBookProps = {
  novel: Novel;
};

function NovelBook({ novel }: novelBookProps) {
  const navigate = useNavigate();

  return (
    <div
      className="book"
      onClick={() => navigate(`/result`, { state: { novel_id: novel.id } })}
    >
      <figure className="bookContainer">
        <img
          src={novel.novel_image}
          alt={novel.novel_name}
          className="photocard"
        />
        <figcaption className="bookName">{novel.novel_name}</figcaption>
      </figure>
    </div>
  );
}

export default NovelBook;
