import React from "react";
import styled from "styled-components";
import arrowIcon from "../../../assets/shared/icon-arrow.svg";
import plusIcon from "../../../assets/shared/icon-plus.svg";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <StyledHeader>
      <div className="header__left-side">
        <button onClick={() => history.push("/")}>
          <img src={arrowIcon} alt="arrow left" /> Go Back
        </button>
        <h1>Roadmap</h1>
      </div>

      <div className="header__right-side">
        <button onClick={() => history.push("/add-feedback")}>
          <img src={plusIcon} alt="plus" /> Add Feedback
        </button>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #373f68;
  color: #ffffff;
  padding: 22px 25px;

  .header__left-side {
    button {
      background: none;
      border: none;
      outline: 0;
      display: flex;
      align-items: center;
      color: #ffffff;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 10px;
      cursor: pointer;

      @keyframes animatearrow {
        0% {
          transform: rotate(270deg);
        }
        50% {
          transform: translateX(-10px) rotate(270deg);
        }

        100% {
          transform: translateX(0) rotate(270deg);
        }
      }

      &:hover {
        img {
          animation: animatearrow 0.8s linear infinite;
        }
      }

      &:focus {
        outline: 2px dashed cyan;
      }

      img {
        margin-right: 15px;
        transform: rotate(270deg);
      }
    }

    h1 {
      font-size: 24px;
    }
  }

  .header__right-side {
    button {
      display: flex;
      align-items: center;
      background: none;
      outline: none;
      border: none;
      background-color: #ad1fea;
      padding: 10px 20px;
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      border-radius: 10px;
      transition: background-color 0.3s ease-in-out;
      cursor: pointer;

      &:focus {
        outline: 2px dashed cyan;
      }

      &:hover {
        background-color: #c75af6;
      }

      &:active {
        transform: scale(0.95);
        transition: none;
      }

      img {
        margin-right: 10px;
      }
    }
  }
`;
