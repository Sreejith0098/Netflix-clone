import React from "react";
import "./Player.css";
import back_arrow_icon from '../../assets/back_arrow_icon.png'
const Player = () => {
  return <div className="player"> 
  <img src={back_arrow_icon} alt="" />
  <iframe width="90%" height="90%" src="https://www.youtube.com/embed/-65VtGmPoi0" title="Avengers" allowFullScreen frameborder="0"></iframe>
  <div className="player-info">
    <p>published date</p>
    <p>name</p>
    <p>type</p>
  </div>
  </div>;
};

export default Player;
