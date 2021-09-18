import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Comments = () => {
  const [textArea, setTextArea] = useState("");

  const handleChange = (e) => {
    setTextArea((text) => e.target.value);
    console.log(textArea);
  };

  return (
    <StyledComments>
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

          <button className="feedback__content-reply-btn">Reply</button>
        </div>

        <div className="feedback__content-bottom">
          <p>
            Awesome idea! Trying to find framework-specific projects within the
            hubs can be tedious.
          </p>

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
        </div>
      </div>
    </StyledComments>
  );
};

export default Comments;

const StyledComments = styled.div`
  display: flex;
  margin-top: 15px;

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
            transition: color 0.3s ease-in;

            &:hover {
              color: #ad1fea;
              transition: color 0.3s ease-in;
            }

            &.disabled {
              color: rgba(0, 0, 0, 0.2);
              transition: color 0.3s ease-in-out;
            }
          }

          &.disabled {
            cursor: not-allowed;
            pointer-events: none;
          }
        }
      }
    }
  }
`;
