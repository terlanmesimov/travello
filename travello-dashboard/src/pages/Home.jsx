import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container">
        <div className="card" onClick={() => navigate("/place")}>
          <h2>Places</h2>
        </div>
        <div className="card" onClick={() => navigate("/blog")}>
          <h2>Blogs</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
