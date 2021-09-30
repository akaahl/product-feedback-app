import React, { useEffect } from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";
import Feedback from "../components/Home/Main/Feedback";
import Comments from "../components/FeedbackDetails/Comments";
import AddComment from "../components/FeedbackDetails/AddComment";
import { useParams, useHistory } from "react-router-dom";
import { totalComments } from "../utils/utilityFunctions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateData } from "../actions/dataActions";
import { motion } from "framer-motion";

const FeedbackDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const feedbackId = id;

  useEffect(() => {
    const storagedata = JSON.parse(localStorage.getItem("data"));
    dispatch(updateData(storagedata));

    window.scrollTo({
      top: 0,
    });
  }, [dispatch]);

  const data = useSelector((state) => state.data);
  const productRequests = data.productRequests;
  const feedback = productRequests.filter((item) => item.id === Number(id))[0];
  const { title, category, upvotes, description, comments } = feedback;

  const handleBackBtn = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleEditFeedback = (e) => {
    e.preventDefault();
    history.push(`/edit-feedback/${feedbackId}`);
  };

  const feedbackVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: 500,
      opacity: 0,
    },
  };

  return (
    <StyledFeedback
      variants={feedbackVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <nav className="feedback__nav">
        <button className="feedback__nav-back-btn" onClick={handleBackBtn}>
          <img src={arrowLeftIcon} alt="arrow left" />
          Go Back
        </button>

        <button className="feedback__nav-edit-btn" onClick={handleEditFeedback}>
          Edit Feedback
        </button>
      </nav>

      <Feedback
        upvotes={upvotes}
        title={title}
        id={+feedbackId}
        description={description}
        comments={comments}
        category={category}
        preventRedirect={true}
        key={id}
        feedbackId={feedbackId}
      />

      <section className="feedback__comments">
        <h4>{totalComments(comments)} Comments</h4>

        {comments &&
          comments.map(
            ({ id, content, replies, user: { image, name, username } }) => (
              <Comments
                key={id}
                commentId={id}
                feedbackId={+feedbackId}
                content={content}
                imageUrl={image}
                name={name}
                username={username}
                replies={replies}
              />
            )
          )}
      </section>

      <AddComment feedbackId={+feedbackId} />
    </StyledFeedback>
  );
};

export default FeedbackDetails;

const StyledFeedback = styled(motion.main)`
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

  section {
    margin-top: 30px;
    background-color: #ffffff;
    border-radius: 10px;

    &.feedback__comments {
      padding: 25px;

      h4 {
        color: #3a4374;
        font-size: 20px;
        margin-bottom: 30px;
      }
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 425px) {
    nav {
      .feedback__nav-back-btn {
        font-size: 90%;
      }

      .feedback__nav-edit-btn {
        font-size: 80%;
        padding: 10px;
      }
    }

    section {
      &.feedback__comments {
        h4 {
          font-size: 90%;
        }
      }
    }
  }
`;
