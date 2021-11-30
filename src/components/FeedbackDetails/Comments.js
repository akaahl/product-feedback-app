import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import InnerComments from "./InnerComments";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";
import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import { AnimatePresence } from "framer-motion";

const Comments = ({
  commentId,
  feedbackId,
  content,
  imageUrl,
  name,
  username,
  replies,
}) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();
    setReply((reply) => !reply);
  };

  const deleteComment = (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("data"));

    data.productRequests.map((feedback) => {
      if (feedback.id === feedbackId) {
        const updatedComments = feedback.comments.filter(
          (comment) => comment.id !== commentId
        );

        feedback.comments = updatedComments;
      }
      return feedback;
    });

    localStorage.setItem("data", JSON.stringify(data));
    dispatch(updateData(data));
  };

  const addInnerReplies = (text, user, feedbackId, commentId) => {
    const currentUser = JSON.parse(localStorage.getItem("data")).currentUser;

    const data = JSON.parse(localStorage.getItem("data"));

    data.productRequests.map((feedback) => {
      if (feedback.id === feedbackId) {
        feedback.comments.forEach((comment) => {
          if (comment.id === commentId) {
            const innerReply = {
              content: text,
              replyingTo: user,
              user: currentUser,
            };

            if (!comment.replies) comment.replies = [];

            comment.replies.push(innerReply);
          }
        });
      }
      return feedback;
    });

    localStorage.setItem("data", JSON.stringify(data));
    dispatch(updateData(data));
  };

  return (
    <StyledComments>
      <div className="feedback__top">
        <img src={process.env.PUBLIC_URL + "/" + imageUrl} alt={name} />

        <div className="feedback__top-details">
          <div className="feedback__top-details-user">
            <p>{name}</p>
            <span>@{username}</span>
          </div>

          <button
            className="feedback__top-details-reply-btn"
            onClick={handleReply}
          >
            Reply
          </button>
        </div>
      </div>

      <p className="feedback__content">{content}</p>

      <AnimatePresence>
        {reply && (
          <Form
            username={username}
            addInnerReplies={addInnerReplies}
            feedbackId={feedbackId}
            commentId={commentId}
            setReply={setReply}
            mobile={true}
          />
        )}
      </AnimatePresence>

      {name.trim() === "Zena Kelley" ? (
        <div className="feedback__content-delete">
          <button type="button" onClick={deleteComment}>
            <Icon icon="mdi:delete" className="delete-btn" />
            Delete
          </button>
        </div>
      ) : null}

      <div className="feedback__comments-content">
        {replies &&
          replies.map(
            ({ content, replyingTo, user: { image, name, username } }) => (
              <InnerComments
                key={uuidv4()}
                content={content}
                replyingTo={replyingTo}
                imageUrl={image}
                name={name}
                username={username}
                commentId={commentId}
                feedbackId={feedbackId}
                addInnerReplies={addInnerReplies}
                setReply={setReply}
              />
            )
          )}
        <hr />
      </div>
    </StyledComments>
  );
};

export default Comments;

const StyledComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .feedback__top {
    display: flex;

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      object-fit: contain;
    }

    .feedback__top-details {
      flex: 1;
      display: flex;
      margin-left: 20px;

      .feedback__top-details-user {
        flex: 1;

        p {
          color: #3a4374;
          font-weight: 700;
          font-size: 14px;
        }

        span {
          color: #647196;
          font-size: 14px;
        }
      }

      .feedback__top-details-reply-btn {
        background: none;
        border: none;
        color: #4661e6;
        cursor: pointer;
        font-weight: 700;
      }
    }
  }

  .feedback__content {
    margin-top: 20px;
    margin-left: 70px;
    color: #647196;
    font-size: 16px;
    margin-bottom: 10px;

    span {
      color: #ad1fea;
      font-weight: 600;
      font-size: 15px;
    }
  }

  .feedback__content-delete {
    margin-top: 20px;
    align-self: flex-end;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 0 auto;
      background: none;
      border: none;
      cursor: pointer;

      .delete-btn {
        color: #647196;
        opacity: 0.5;
        height: 22px;
        width: 22px;
        transition: opacity 0.2s ease-in-out;
      }

      &:hover {
        .delete-btn {
          opacity: 1;
        }
      }
    }
  }

  .feedback__comments-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .feedback__content-top {
      display: flex;
      justify-content: space-between;

      .feedback__content-top-user-details {
        p {
          color: #3a4374;
          font-weight: 700;
          font-size: 14px;
        }

        span {
          color: #647196;
          font-size: 14px;
        }
      }

      .feedback__content-reply-btn {
        background: none;
        border: none;
        color: #4661e6;
        cursor: pointer;
        font-weight: 700;
      }
    }

    hr {
      margin-top: 25px;
      border: 0.1px solid rgba(0, 0, 0, 0.04);
    }
  }

  @media (max-width: 768px) {
    .feedback__content {
      margin-left: 0;
    }

    .feedback__comments-content {
      margin-left: 0;
    }
  }

  @media (max-width: 425px) {
    .feedback__top {
      img {
        height: 35px;
        width: 35px;
      }

      .feedback__top-details {
        .feedback__top-details-user {
          p,
          span {
            font-size: 80%;
          }
        }

        .feedback__top-details-reply-btn {
          font-size: 80%;
        }
      }
    }

    .feedback__content {
      font-size: 90%;

      span {
        font-size: 90%;
      }
    }
  }
`;
