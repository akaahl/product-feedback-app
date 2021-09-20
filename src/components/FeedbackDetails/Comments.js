import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import InnerComments from "./InnerComments";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";
import { v4 as uuidv4 } from "uuid";

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
  const [textArea, setTextArea] = useState("");
  const [reply, setReply] = useState(false);

  const handleChange = (e) => {
    setTextArea((text) => e.target.value);
  };

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

      return null;
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
              id: uuidv4(),
              content: text,
              replyingTo: user,
              user: currentUser,
            };

            if (!comment.replies) comment.replies = [];

            comment.replies.push(innerReply);
          }
        });
      }

      return null;
    });

    localStorage.setItem("data", JSON.stringify(data));
    dispatch(updateData(data));
  };

  return (
    <StyledComments>
      <img src={process.env.PUBLIC_URL + "/" + imageUrl} alt={name} />

      <div className="feedback__comments-content">
        <div className="feedback__content-top">
          <div className="feedback__content-top-user-details">
            <p>{name}</p>
            <span>@{username}</span>
          </div>

          <button className="feedback__content-reply-btn" onClick={handleReply}>
            Reply
          </button>
        </div>

        <div className="feedback__content-bottom">
          <p>{content}</p>

          {reply && (
            <form className="feedback__content-bottom-reply">
              <textarea
                name="replyComment"
                placeholder={`Replying to @${username}`}
                value={textArea}
                onChange={handleChange}
              ></textarea>

              <button
                className={textArea ? "" : "disabled"}
                onClick={(e) => {
                  e.preventDefault();
                  addInnerReplies(textArea, username, feedbackId, commentId);
                  setTextArea((text) => "");
                  setReply((reply) => false);
                }}
              >
                <Icon
                  icon="mdi:send-circle-outline"
                  className={textArea ? "reply-icon" : "reply-icon disabled"}
                />
              </button>
            </form>
          )}

          {name.trim() === "Zena Kelley" ? (
            <div className="feedback__content-delete">
              <button type="button" onClick={deleteComment}>
                <Icon icon="mdi:delete" className="delete-btn" />
              </button>
            </div>
          ) : null}
        </div>

        {replies &&
          replies.map(
            (
              { content, replyingTo, user: { image, name, username } },
              index
            ) => (
              <InnerComments
                key={uuidv4()}
                innerCommentId={uuidv4()}
                content={content}
                replyingTo={replyingTo}
                imageUrl={image}
                name={name}
                username={username}
                commentId={commentId}
                feedbackId={feedbackId}
                addInnerReplies={addInnerReplies}
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
  margin-top: 15px;
  padding-bottom: 15px;

  img {
    align-self: flex-start;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: contain;
  }

  .feedback__comments-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 40px;

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

    .feedback__content-bottom {
      margin-top: 20px;

      p {
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
        margin-bottom: 15px;
        display: flex;

        button {
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

      .feedback__content-bottom-reply {
        margin-top: 15px;
        border-radius: 10px;
        background-color: #f7f8fd;
        display: flex;
        padding: 15px;

        textarea {
          flex: 1;
          height: 110px;
          border: none;
          background-color: #f7f8fd;
          resize: none;
          font-size: 17px;
          color: #647196;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: #647196;
            opacity: 0.7;
            font-size: 14px;
          }
        }

        button {
          background: none;
          border: none;
          outline: none;
          align-self: flex-end;
          cursor: pointer;

          .reply-icon {
            height: 25px;
            width: 25px;
            color: #4661e6;
            transition: color 0.2s ease-in;

            &:hover {
              color: #ad1fea;
              transition: color 0.2s ease-in;
            }

            &.disabled {
              color: rgba(0, 0, 0, 0.2);
              transition: color 0.2s ease-in-out;
            }
          }

          &.disabled {
            cursor: not-allowed;
            pointer-events: none;
          }
        }
      }
    }

    hr {
      margin-top: 25px;
      margin-left: -51px;
      border: 0.2px solid rgba(0, 0, 0, 0.05);
    }
  }
`;
