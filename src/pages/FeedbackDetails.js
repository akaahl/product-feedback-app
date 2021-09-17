import React from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";
import Feedback from "../components/Home/Main/Feedback";

const FeedbackDetails = () => {
  return (
    <StyledFeedback>
      <nav className="feedback__nav">
        <button className="feedback__nav-back-btn">
          <img src={arrowLeftIcon} alt="arrow left" />
          Go Back
        </button>

        <button className="feedback__nav-edit-btn">Edit Feedback</button>
      </nav>

      <Feedback
        upvotes={112}
        title="Add tags for solutions"
        id={1}
        description="Easier to search for solutions based on a specific stack"
        category="enhancement"
        key={2}
      />
    </StyledFeedback>
  );
};

export default FeedbackDetails;

const StyledFeedback = styled.main`
  margin: 70px 0;
  width: 800px;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    .feedback__nav-back-btn {
      border: none;
      background: none;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #647196;
      font-weight: 600;
      font-size: 16px;

      img {
        margin-right: 15px;
        height: 10px;
        width: 8px;
      }
    }

    .feedback__nav-edit-btn {
      border: none;
      background: none;
      border-radius: 10px;
      padding: 10px 25px;
      color: #ffffff;
      background-color: #4661e6;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      box-shadow: rgba(36, 26, 26, 0.2) 0px 2px 1px -1px,
        rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;

      &:hover {
        background-color: #7c91f9;
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
`;
