import React from "react";
import styled from "styled-components";
import commentsIcon from "../../../assets/shared/icon-comments.svg";
import { totalComments } from "../../../utils/utilityFunctions";
import UpvoteButton from "./UpvoteButton";

const Feedback = ({ upvotes, title, id, description, comments, category }) => {
  return (
    <FeedbackContainer>
      <UpvoteButton upvotes={upvotes} id={id} />

      <div className="feedback__content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="content-pill">
          <span>{category[0].toUpperCase() + category.substring(1)}</span>
        </div>
      </div>

      <div className="feedback__comments">
        <img src={commentsIcon} alt="comments" />
        <span>{totalComments(comments)}</span>
      </div>
    </FeedbackContainer>
  );
};

export default Feedback;

const FeedbackContainer = styled.section`
  cursor: pointer;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  button {
    border: 0;
    border-radius: 10px;
    background-color: #f2f4ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px 15px;
    font-weight: 700;
    color: #3a4374;
    outline: none;

    &:focus {
      outline: 2px solid black;
    }

    &.upvoted {
      background-color: #4661e6;
      color: #f2f4ff;

      &:hover {
        background-color: #7c91f9;
      }
    }

    &:hover {
      background-color: #cfd7ff;
      transition: all 0.3s ease-in-out;
    }

    &:active {
      transform: scale(0.9);
      transition: 0.1s ease-in;
    }

    img {
      margin-bottom: 8px;
    }
  }

  .feedback__content {
    margin-left: 40px;
    flex: 1;
    display: flex;
    flex-direction: column;

    h3 {
      color: #3a4374;
      font-weight: 700;
    }

    p {
      margin-top: 10px;
      color: #647196;
    }

    .content-pill {
      margin: 20px 0 14px;

      span {
        padding: 8px;
        border-radius: 10px;
        color: #4661e6;
        font-size: 14px;
        font-weight: 600;
        background-color: #f2f4ff;
      }
    }
  }

  .feedback__comments {
    align-self: center;
    display: flex;
    align-items: center;
    margin-right: 20px;

    img {
      margin-right: 10px;
      width: 25px;
      height: 20px;
    }

    span {
      color: #3a4374;
      font-weight: 600;
    }
  }
`;
