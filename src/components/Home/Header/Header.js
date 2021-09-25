import { useState } from "react";
import styled from "styled-components";
import DesktopHeader from "../../../assets/suggestions/desktop/background-header.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterCategory } from "../../../actions/dataActions";

const Header = () => {
  const dispatch = useDispatch();

  const [buttonActive, setButtonActive] = useState(1);

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

  const handleClick = (e) => {
    e.preventDefault();

    const category = e.target.className.split(" ")[1];
    dispatch(filterCategory(category));

    const id = Number(e.target.id);
    setButtonActive(id);
  };

  const toggleActiveStyles = (category, index) => {
    if (index === buttonActive) {
      return `category ${category} active`;
    } else {
      return `category ${category}`;
    }
  };

  return (
    <StyledHeader>
      <div className="header__feedback-board">
        <h3>Frontend Mentor</h3>
        <p>Feedback Board</p>
      </div>

      <div className="header__categories">
        <div className="top">
          <button
            className={toggleActiveStyles("all", 1)}
            onClick={handleClick}
            id="1"
          >
            All
          </button>
          <button
            className={toggleActiveStyles("ui", 2)}
            onClick={handleClick}
            id="2"
          >
            UI
          </button>
          <button
            className={toggleActiveStyles("ux", 3)}
            onClick={handleClick}
            id="3"
          >
            UX
          </button>
        </div>

        <div className="mid">
          <button
            className={toggleActiveStyles("enhancement", 4)}
            onClick={handleClick}
            id="4"
          >
            Enhancement
          </button>
          <button
            className={toggleActiveStyles("bug", 5)}
            onClick={handleClick}
            id="5"
          >
            Bug
          </button>
        </div>

        <div className="bottom">
          <button
            className={toggleActiveStyles("feature", 6)}
            onClick={handleClick}
            id="6"
          >
            Feature
          </button>
        </div>
      </div>

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
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  flex: 0.2;
  display: flex;
  flex-direction: column;

  .header__feedback-board {
    height: 150px;
    padding: 10px 20px;
    background-image: url(${DesktopHeader});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h3,
    p {
      color: #ffffff;
    }

    h3 {
      margin-bottom: 0;
    }

    p {
      margin: 10px 0;
    }
  }

  .header__categories {
    background: #ffffff;
    padding: 20px;
    height: 190px;
    border-radius: 10px;
    margin-top: 20px;

    .top,
    .mid,
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 13px;

      button {
        padding: 10px 14px;
        border: none;
        border-radius: 10px;
        background: #f2f4ff;
        color: #4661e6;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background: rgba(70, 97, 230, 0.7);
          color: #ffffff;
          transition: 0.2s ease-in-out;
        }

        &:active {
          transform: scale(0.92);
          transition: none;
        }

        &.active {
          background: #4661e6;
          color: #ffffff;
        }
      }
    }

    .top {
      margin-top: 0px;

      button {
        padding: 10px 18px;
      }
    }
  }

  .header__roadmap {
    height: 170px;
    padding: 20px;
    background: #ffffff;
    margin-top: 20px;
    border-radius: 10px;

    .header__roadmap-view {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        color: #3a4374;
        font-weight: 700;
      }

      a {
        color: #4661e6;
        font-weight: 700;
        font-size: 14px;
      }
    }

    .header__roadmap-categories {
      margin-top: 15px;
      .category {
        display: flex;
        align-items: center;

        &:not(:first-child) {
          margin-top: 6px;
        }

        .circle {
          height: 8px;
          width: 8px;
          border-radius: 50%;

          &.orange {
            background-color: #f49f85;
          }

          &.purple {
            background-color: #ad1fea;
          }

          &.green {
            background-color: #62bcfa;
          }
        }

        p {
          flex: 1;
          margin: 0;
          margin-left: 15px;
          font-weight: 500;
          color: #647196;
        }

        span {
          color: #647196;
          font-weight: 800;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .header__feedback-board,
    .header__categories,
    .header__roadmap {
      margin-top: 0;
      margin-bottom: 40px;
      height: 190px;
      flex: 0.3;
    }
  }
`;
