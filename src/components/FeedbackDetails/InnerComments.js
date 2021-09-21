import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";

const InnerComments = ({
  content,
  replyingTo,
  imageUrl,
  name,
  username,
  feedbackId,
  commentId,
  addInnerReplies,
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

  const deleteInnerReply = () => {
    const data = JSON.parse(localStorage.getItem("data"));

    data.productRequests.forEach((feedback) => {
      if (feedback.id === feedbackId) {
        feedback.comments.forEach((comment) => {
          if (comment.id === commentId) {
            const updatedReplies = comment.replies.filter(
              (reply) =>
                reply.content + reply.replyingTo + reply.user.name !==
                content + replyingTo + name
            );
            comment.replies = updatedReplies;
          }
        });
      }
    });

    localStorage.setItem("data", JSON.stringify(data));
    dispatch(updateData(data));
  };

  return (
    <StyledInnerComments>
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
          <p>
            <span>@{replyingTo}</span> {content}
          </p>

          {name.trim() === "Zena Kelley" ? (
            <div className="feedback__content-delete">
              <button onClick={deleteInnerReply}>
                <Icon icon="mdi:delete" className="delete-btn" />
              </button>
            </div>
          ) : null}

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
        </div>
      </div>
    </StyledInnerComments>
  );
};

export default InnerComments;

const StyledInnerComments = styled.div`
  display: flex;
  margin-top: 35px;
  margin-left: -51px;
  padding-left: 15px;
  border-left: 0.2px solid rgba(0, 0, 0, 0.07);
`;
