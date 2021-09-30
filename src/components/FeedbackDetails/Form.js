import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Form = ({
  username,
  addInnerReplies,
  feedbackId,
  commentId,
  setReply,
  mobile,
}) => {
  const [formFocus, setFormFocus] = useState(false);

  const [textArea, setTextArea] = useState("");

  const handleChange = (e) => {
    setTextArea((text) => e.target.value);
  };

  const formVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
  };

  return (
    <FormContainer
      className={
        formFocus
          ? "feedback__content-bottom-reply active"
          : "feedback__content-bottom-reply"
      }
      mobile={mobile}
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <textarea
        name="replyComment"
        placeholder={`Replying to @${username}`}
        value={textArea}
        onChange={handleChange}
        onFocus={() => setFormFocus(true)}
        onBlur={() => setFormFocus(false)}
      ></textarea>

      <button
        className={textArea ? "" : "disabled"}
        disabled={!textArea ? true : false}
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
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled(motion.form)`
  margin-top: 15px;
  margin-left: 70px;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #f7f8fd;
  display: flex;
  padding: 15px;
  transition: border 0.2s ease-in-out;

  &.active {
    border: 1px solid #4661e6;
    outline: none;
  }

  textarea {
    flex: 1;
    height: 110px;
    border: 1px solid transparent;
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
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

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
