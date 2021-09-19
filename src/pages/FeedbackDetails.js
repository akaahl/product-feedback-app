import React, { useEffect } from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";
import Feedback from "../components/Home/Main/Feedback";
import Comments from "../components/FeedbackDetails/Comments";
import AddComment from "../components/FeedbackDetails/AddComment";
import { useParams, useHistory } from "react-router-dom";
import { totalComments } from "../utils/utilityFunctions";

const FeedbackDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("data"));
  const productRequests = data.productRequests;
  const feedback = productRequests.filter((item) => item.id === +id)[0];
  const { title, category, upvotes, status, description, comments, upvoted } =
    feedback;

  const handleBackBtn = (e) => {
    e.preventDefault();
    history.push("/");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
  }, [data]);

  return (
    <StyledFeedback>
      <nav className="feedback__nav">
        <button className="feedback__nav-back-btn" onClick={handleBackBtn}>
          <img src={arrowLeftIcon} alt="arrow left" />
          Go Back
        </button>

        <button className="feedback__nav-edit-btn">Edit Feedback</button>
      </nav>

      <Feedback
        upvotes={upvotes}
        title={title}
        id={+id}
        description={description}
        comments={comments}
        category={category}
        preventRedirect={true}
        key={id}
      />

      <section className="feedback__comments">
        <h4>{totalComments(comments)} Comments</h4>

        {comments &&
          comments.map(
            ({ id, content, replies, user: { image, name, username } }) => (
              <Comments
                key={id}
                id={id}
                content={content}
                imageUrl={image}
                name={name}
                username={username}
                replies={replies}
              />
            )
          )}
      </section>

      <AddComment id={+id} />
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
`;
