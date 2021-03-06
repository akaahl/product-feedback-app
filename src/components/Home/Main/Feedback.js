import React from "react";
import styled from "styled-components";
import commentsIcon from "../../../assets/shared/icon-comments.svg";
import { totalComments } from "../../../utils/utilityFunctions";
import UpvoteButton from "./UpvoteButton";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const Feedback = ({
  upvotes,
  title,
  id,
  description,
  comments,
  category,
  preventRedirect,
  feedbackId,
  selectionsLength,
  index,
  upvoted,
}) => {
  const history = useHistory();

  const showFeedback = (e) => {
    history.push(`/feedback/${id}`);
  };

  const feedbackVariants = preventRedirect
    ? {
        initial: {
          x: 0,
          opacity: 1,
        },
      }
    : {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            type: "spring",
            delay: index * 0.25,
          },
        },
      };
  return (
    <FeedbackContainer
      onClick={preventRedirect ? null : showFeedback}
      hover={feedbackId}
      selectionsLength={selectionsLength}
      feedbackId={feedbackId}
      variants={feedbackVariants}
      initial="initial"
      animate="animate"
      layoutId={`layout-${id}`}
      whileHover={{ scale: feedbackId ? "none" : 1.02 }}
    >
      <UpvoteButton upvotes={upvotes} id={id} upvoted={upvoted} />

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

const FeedbackContainer = styled(motion.section)`
  cursor: ${(props) => (!props.hover ? "pointer" : "default")};
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

  @media (max-width: 768px) {
    width: ${(props) => (props.feedbackId ? "100%" : "")};
    display: grid;
    margin: ${(props) =>
      props.feedbackId ? "20px 0 0 0" : "20px 40px 0 40px"};
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

    &:last-child {
      margin-bottom: ${(props) => (props.selectionsLength < 4 ? "100vh" : "0")};
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
    margin: ${(props) =>
      props.feedbackId ? "20px 0 0 0" : "20px 10px 0 10px"};
    margin-bottom: ${(props) => (props.selectionsLength < 4 ? "100vh" : "0")};

    padding: 20px;

    button {
      padding: 5px 10px;

      img {
        margin-right: 5px;
      }

      span {
        font-size: 80%;
      }
    }

    .feedback__content {
      font-size: 80%;

      .content-pill {
        span {
          font-size: 80%;
        }
      }
    }

    .feedback__comments {
      img {
        width: 20px;
        height: 15px;
      }
      span {
        font-size: 80%;
      }
    }
  }
`;
