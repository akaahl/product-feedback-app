import React from "react";
import styled from "styled-components";
import commentsIcon from "../../../assets/shared/icon-comments.svg";
import { totalComments } from "../../../utils/utilityFunctions";
import UpvoteButton from "../../Home/Main/UpvoteButton";
import { useHistory } from "react-router-dom";

const Feedback = ({
  upvotes,
  title,
  id,
  description,
  comments,
  category,
  status,
  roadmap,
  upvoted,
}) => {
  const history = useHistory();

  return (
    <StyledFeedback
      className={
        status === "planned"
          ? "planned"
          : status === "in-progress"
          ? "in-progress"
          : "live"
      }
      onClick={() => history.push(`/feedback/${id}`)}
      roadmap={roadmap}
    >
      <div className="section__status">
        <div className="section__status-circle"></div>
        <p>{status[0].toUpperCase() + status.substring(1)}</p>
      </div>

      <p className="section__title">{title}</p>

      <p className="section__description">{description}</p>

      <div className="section__category-pill">
        <span>{category[0].toUpperCase() + category.substring(1)}</span>
      </div>

      <div className="section__upvotes-and-comments">
        <UpvoteButton upvotes={upvotes} id={id} upvoted={upvoted} />

        <div
          className="section__upvotes-and-comments_comments"
          title="2 comments"
        >
          <img src={commentsIcon} alt="comments" />
          <span>{totalComments(comments)}</span>
        </div>
      </div>
    </StyledFeedback>
  );
};

export default Feedback;

const StyledFeedback = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-radius: 9px;
  background-color: #ffffff;
  padding: 20px 25px 28px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  &.planned {
    border-top: 8px solid #f49f85;

    .section__status {
      .section__status-circle {
        background: #f49f85;
      }
    }
  }

  &.in-progress {
    border-top: 8px solid #ad1fea;

    .section__status {
      .section__status-circle {
        background: #ad1fea;
      }
    }
  }

  &.live {
    border-top: 8px solid #62bcfa;

    .section__status {
      .section__status-circle {
        background: #62bcfa;
      }
    }
  }

  .section__status {
    display: flex;
    align-items: center;

    .section__status-circle {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      margin-right: 15px;
    }

    p {
      color: #647196;
    }
  }

  .section__title {
    margin-top: 15px;
    font-weight: 600;
    color: #3a4374;
  }

  .section__description {
    margin-top: 15px;
    color: #647196;
  }

  .section__category-pill {
    margin-top: 25px;
    user-select: none;

    span {
      padding: 8px;
      border-radius: 10px;
      color: #4661e6;
      font-size: 14px;
      font-weight: 600;
      background-color: #f2f4ff;
    }
  }

  .section__upvotes-and-comments {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: 0;
      border-radius: 10px;
      background-color: #f2f4ff;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px 15px;
      font-weight: 700;
      color: #3a4374;
      outline: none;

      &:focus {
        outline: 2px solid black;
      }

      &:hover {
        background-color: #cfd7ff;
        transition: background-color 0.3s ease-in-out;
      }

      &:active {
        transform: scale(0.95);
        transition: none;
        outline: none;
      }

      &.upvoted {
        background-color: #4661e6;
        color: #f2f4ff;

        &:hover {
          background-color: #7c91f9;
        }
      }

      img {
        margin-right: 8px;
      }
    }

    .section__upvotes-and-comments_comments {
      display: flex;
      align-items: center;
      margin-right: 25px;

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
  }

  @media (max-width: 768px) {
    &:hover {
      transform: ${({ roadmap }) => (roadmap ? "scale(1)" : "scale(1.02)")};
    }
  }
`;
