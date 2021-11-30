import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";

const AddComment = ({ feedbackId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const handleComment = (e) => {
    setComment((comment) => e.target.value);

    if (comment.length >= 250) setComment((comment) => comment.slice(0, 250));
  };

  const handleNoInput = () => {
    return !comment ? setError(true) : setError(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!comment) {
      setError(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("data")).currentUser;

    const data = JSON.parse(localStorage.getItem("data"));
    data.productRequests.map((feedback) => {
      if (feedback.id === feedbackId) {
        if (!feedback.comments) feedback.comments = [];
        const commentId = feedback.comments.length
          ? feedback.comments[feedback.comments.length - 1].id + 1
          : 0;
        const userComment = { id: commentId, content: comment, user };
        feedback.comments.push(userComment);
      }
      return feedback;
    });

    localStorage.setItem("data", JSON.stringify(data));
    dispatch(updateData(data));
    setComment((comment) => "");
    setError(false);
  };

  return (
    <StyledAddComment>
      <h4>Add Comment</h4>

      <form>
        <textarea
          className={error ? "error" : null}
          name="addComment"
          placeholder="Type your comment here"
          value={comment}
          onChange={handleComment}
          onBlur={handleNoInput}
        ></textarea>

        <div className="addComment__submit">
          <span className="addComment__submit-comments-length">
            {comment.length} / 250
          </span>

          <button type="submit" onClick={handleAddComment}>
            Post Comment
          </button>
        </div>
      </form>
    </StyledAddComment>
  );
};

export default AddComment;

const StyledAddComment = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;

  h4 {
    color: #3a4374;
    font-weight: 700;
    font-size: 20px;
  }

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;

    textarea {
      border: 1px solid transparent;
      background-color: #f7f8fd;
      border-radius: 5px;
      height: 150px;
      resize: none;
      outline: none;
      padding: 15px;
      color: #647196;
      font-size: 17px;
      transition: border 0.2s ease-in;

      &.error {
        border: 1px solid orangered;
      }

      &::placeholder {
        color: #647196;
        opacity: 0.7;
        font-size: 14px;
      }

      &:focus {
        border: 1px solid #4661e6;
      }
    }

    .addComment__submit {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .addComment__submit-comments-length {
        font-size: 12px;
        color: #647196;
      }

      button {
        border: none;
        background-color: #ad1fea;
        padding: 15px 30px;
        border-radius: 10px;
        cursor: pointer;
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #c75af6;
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  @media (max-width: 425px) {
    padding: 15px;

    h4 {
      font-size: 90%;
    }

    form {
      textarea {
        font-size: 90%;
      }

      .addComment__submit {
        button {
          padding: 10px;
          font-size: 80%;
        }
      }
    }
  }
`;
