import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import axios from "axios";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [movies, setMovies] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchApi = async () => {
      const options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/auto-complete",
        params: { q: "game of thr" },
        headers: {
          "x-rapidapi-key": "28cde28d03mshafacd633fc6e966p154a21jsn42e66c125b89",
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // ✅ set only the array of movies
        setMovies(response.data.d || []);
      } catch (error) {
        console.error("API ERROR:", error);
      }
    };

    fetchApi();

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }

    // cleanup
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div style={{marginTop:'170px'}}  className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies.map((card, index) => (
          <div className="cards" key={index}>
            <img
              src={card.i?.imageUrl || "https://via.placeholder.com/150"}
              alt={card.l}
            />
            <p>{card.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
