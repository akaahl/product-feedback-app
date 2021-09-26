import React from "react";
import styled from "styled-components";
import commentsIcon from "../../../assets/shared/icon-comments.svg";
import { totalComments } from "../../../utils/utilityFunctions";
import UpvoteButton from "./UpvoteButton";
import { useHistory } from "react-router-dom";

const Feedback = ({
  upvotes,
  title,
  id,
  description,
  comments,
  category,
  preventRedirect,
  feedbackId,
}) => {
  const history = useHistory();

  const showFeedback = (e) => {
    history.push(`/feedback/${id}`);
  };
  return (
    <FeedbackContainer
      onClick={preventRedirect ? null : showFeedback}
      hover={feedbackId}
    >
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
  cursor: ${(props) => (!props.hover ? "pointer" : "default")};
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: ${(props) => (!props.hover ? `scale(1.02)` : `none`)};
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

  @media (max-width: 768px) {
    display: grid;
    margin: 20px 40px 0 40px;
    grid-template-areas:
      "content content content"
      "content content content"
      "upvote . comment";
    padding: 30px;

    &:hover {
      transform: none;
    }

    &:first-child {
      margin-top: 40px;
    }

    button {
      grid-area: upvote;
      flex-direction: row;

      img {
        margin-bottom: 0;
        margin-right: 15px;
      }
    }

    .feedback__content {
      grid-area: content;
      margin-left: 0;
      margin-bottom: 20px;
    }

    .feedback__comments {
      grid-area: comment;
    }
  }

  @media (max-width: 425px) {
    margin: 20px 10px 0 10px;
    padding: 20px;

    button {
      padding: 5px 10px;

      img {
        margin-right: 5px;
      }

      span {
        font-size: 90%;
      }
    }

    .feedback__content {
      font-size: 90%;

      .content-pill {
        span {
          font-size: 90%;
        }
      }
    }

    .feedback__comments {
      img {
        width: 20px;
        height: 15px;
      }
      span {
        font-size: 90%;
      }
    }
  }
`;
