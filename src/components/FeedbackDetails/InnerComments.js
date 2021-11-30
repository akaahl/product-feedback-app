import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";
import Form from "./Form";
import { AnimatePresence } from "framer-motion";

const InnerComments = ({
  content,
  replyingTo,
  imageUrl,
  name,
  username,
  feedbackId,
  commentId,
  addInnerReplies,
  setReply,
}) => {
  const dispatch = useDispatch();
  const [innerReply, setInnerReply] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();
    setInnerReply((reply) => !reply);
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

      <p className="feedback__content">
        <span>@{replyingTo}</span> {content}
      </p>

      {name.trim() === "Zena Kelley" ? (
        <div className="feedback__content-delete">
          <button onClick={deleteInnerReply}>
            <Icon icon="mdi:delete" className="delete-btn" />
            Delete
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {innerReply && (
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
    </StyledInnerComments>
  );
};

export default InnerComments;

const StyledInnerComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  padding-left: 30px;
  border-left: 0.2px solid rgba(0, 0, 0, 0.07);

  @media (max-width: 375px) {
    padding-left: 10px;
  }
`;
