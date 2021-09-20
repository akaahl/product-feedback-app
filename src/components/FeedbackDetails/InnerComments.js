import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const InnerComments = ({ content, replyingTo, imageUrl, name, username }) => {
  const [textArea, setTextArea] = useState("");
  const [reply, setReply] = useState(false);

  const handleChange = (e) => {
    setTextArea((text) => e.target.value);
  };

  const handleReply = (e) => {
    e.preventDefault();
    setReply((reply) => !reply);
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
            <span>@{username}</span> {content}
          </p>

          {name.trim() === "Zena Kelley" ? (
            <div className="feedback__content-delete">
              <button>
                <Icon icon="mdi:delete" className="delete-btn" />
              </button>
            </div>
          ) : null}

          {reply && (
            <form className="feedback__content-bottom-reply">
              <textarea
                name="replyComment"
                placeholder="Replying to @upbeat1811"
                value={textArea}
                onChange={handleChange}
              ></textarea>

              <button className={textArea ? "" : "disabled"}>
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
