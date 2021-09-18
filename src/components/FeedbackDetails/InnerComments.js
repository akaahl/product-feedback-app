import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const InnerComments = () => {
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
      <img
        src={process.env.PUBLIC_URL + "user-images/image-suzanne.jpg"}
        alt="suzanne"
      />

      <div className="feedback__comments-content">
        <div className="feedback__content-top">
          <div className="feedback__content-top-user-details">
            <p>Suzanne Change</p>
            <span>@upbeat1811</span>
          </div>

          <button className="feedback__content-reply-btn" onClick={handleReply}>
            Reply
          </button>
        </div>

        <div className="feedback__content-bottom">
          <p>
            <span>@upbeat1881</span> Naisu!! You're correct!
          </p>

          <div className="feedback__content-delete">
            <button>
              <Icon icon="mdi:delete" className="delete-btn" />
            </button>
          </div>

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
