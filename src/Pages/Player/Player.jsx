import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const id = useParams();
  const [videos, setVideos] = useState([]);
  const { videoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY; 
    const query = "react tutorial";

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=6&key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((err) => console.error("YouTube fetch error:", err));
  }, []);

  
  const selectedVideo =
    videos.find((v) => v.id.videoId === videoId) || null;

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Go Back"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />

      {selectedVideo ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            title={selectedVideo.snippet.title}
            allowFullScreen
            frameBorder="0"
          ></iframe>
          <div className="player-info">
            <p>{new Date(selectedVideo.snippet.publishedAt).toDateString()}</p>
            <p>{selectedVideo.snippet.title}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Player;
