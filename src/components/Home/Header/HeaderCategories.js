import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterCategory } from "../../../actions/dataActions";
import styled from "styled-components";

const HeaderCategories = ({ mobile }) => {
  const dispatch = useDispatch();
  const [buttonActive, setButtonActive] = useState(1);

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
  );
};

export default HeaderCategories;

const StyledContainer = styled.div`
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
`;
