import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();

  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/seasons/1/episodes"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEpisodes(data);
        console.log("Episodes fetched:", data);
      } catch (err) {
        console.error("Error fetching episodes:", err);
        setError(err.message);
      }
    };

    fetchEpisodes();

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "170px" }} className="title-cards">
      <h2>{title ? title : "Popular on NetFlix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {episodes.map((ep) => (
          <div className="cards" key={ep.id}>
            {ep.image ? (
              <img src={ep.image.original} alt={ep.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <p>{ep.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
