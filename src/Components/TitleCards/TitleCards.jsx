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
          `${category ? category : "https://api.tvmaze.com/seasons/1/episodes"}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        let sortedData = [...data];

        if (title === "Blockbuster Movies") {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (title === "Only on Netflix") {
          sortedData.sort((a, b) => b.name.localeCompare(a.name));
        } else if (title === "Upcoming") {
          sortedData.reverse();
        } else if (title === "Top Pics for You") {
          sortedData = sortedData.sort(() => Math.random() - 0.5).slice(0, 10);
        } else if (title === "Recently Added") {
          sortedData = sortedData.slice(-5);
        } else {
          sortedData.sort((a, b) => a.id - b.id);
        }

        setEpisodes(sortedData);
        console.log("Episodes fetched:", sortedData);
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
  }, [category, title]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "170px" }} className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {episodes.map((ep) => (
          <div className="cards" key={ep.id}>
            {ep.image ? (
              <img src={ep.image.medium} alt={ep.name} />
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
