import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <div className="left">
        <h2>HACKERTHON</h2>
        <p>menu</p>
        <i class="fas fa-home">Home</i>
        <i class="fas fa-search">Search</i>
        <i class="fas fa-users">Group</i>
        <i class="fas fa-file-alt">News</i>
        <i class="far fa-address-card">About</i>
        <p>Explore</p>
        <i class="fas fa-laptop-code">Apps</i>
        <i class="fas fa-tags">Shop</i>
        <i class="fas fa-poll-h">Trend</i>
      </div>
      <div className="between"></div>
      <div className="right"></div>
    </div>
  );
};

export default Home;
