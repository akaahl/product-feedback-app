import React from "react";
import { Link } from "react-router-dom";

const HeaderRoadmap = () => {
  const productRequests = JSON.parse(
    localStorage.getItem("data")
  ).productRequests;

  const plannedRequests = productRequests.filter(
    (request) => request.status === "planned"
  );
  const inProgressRequests = productRequests.filter(
    (request) => request.status === "in-progress"
  );
  const liveRequests = productRequests.filter(
    (request) => request.status === "live"
  );

  return (
    <div className="header__roadmap">
      <div className="header__roadmap-view">
        <h3>Roadmap</h3>

        <Link to="/roadmap">
          <p>View</p>
        </Link>
      </div>

      <div className="header__roadmap-categories">
        <div className="category">
          <div className="circle orange"></div>
          <p>Planned</p>
          <span>{plannedRequests.length}</span>
        </div>

        <div className="category">
          <div className="circle purple"></div>
          <p>In-Progress</p>
          <span>{inProgressRequests.length}</span>
        </div>

        <div className="category">
          <div className="circle green"></div>
          <p>Live</p>
          <span>{liveRequests.length}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderRoadmap;
