import React, { useState } from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";
import gradientBackground from "../assets/suggestions/desktop/background-header.png";
import plusIcon from "../assets/shared/icon-plus.svg";
import { useHistory } from "react-router";
import SelectDropdown from "../components/AddFeedback/SelectDropdown";

const AddFeedback = () => {
  const history = useHistory();

  const [errorStatus, setErrorStatus] = useState({
    title: false,
    category: false,
    details: false,
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    details: "",
  });

  const handleError = (e) => {
    const name = e.target.name;

    if (!formData[name]) {
      setErrorStatus({
        ...errorStatus,
        [name]: true,
      });
    } else {
      setErrorStatus({
        ...errorStatus,
        [name]: false,
      });
    }
  };

  const handleFormChange = (e) => {
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const keys = Object.keys(formData);

    keys.forEach((key) => {
      if (!formData[key]) {
        setErrorStatus((err) => ({ ...err, [key]: true }));
      }
    });
    // if (!formData.title) {
    //   setErrorStatus((err) => ({ ...err, title: true }));
    // }

    // if (!formData.category) {
    //   setErrorStatus((err) => ({ ...err, category: true }));
    // }
  };

  return (
    <StyledContainer>
      <nav>
        <button onClick={() => history.push("/")}>
          <img src={arrowLeftIcon} alt="arrow left" />
          Go back
        </button>
      </nav>

      <main>
        <div className="feedback__add-icon">
          <img src={plusIcon} alt="plus" />
        </div>

        <h1>Create A New Feedback</h1>

        <form>
          <label htmlFor="title" name="title">
            Feedback Title
          </label>
          <span>Add a short, descriptive headline</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            onBlur={handleError}
            className={errorStatus.title ? "error" : ""}
          />
          <small
            className={errorStatus.title ? "error-title show" : "error-title"}
          >
            Field cannot be empty
          </small>

          <label htmlFor="category">Feedback Category</label>
          <span>Choose a category for your feedback</span>

          <SelectDropdown
            errorStatus={errorStatus}
            setErrorStatus={setErrorStatus}
            formData={formData}
            setFormData={setFormData}
            arrowLeftIcon={arrowLeftIcon}
          />

          <label htmlFor="details">Feedback Details</label>
          <span>
            Include any specific comments on what should be improved, added, etc
          </span>
          <textarea
            name="details"
            className={
              errorStatus.details
                ? "feedback__input-details error"
                : "feedback__input-details"
            }
            id="details"
            value={formData.details}
            onChange={handleFormChange}
            onBlur={handleError}
          />
          <small
            className={
              errorStatus.details ? "error-details show" : "error-details"
            }
          >
            Field cannot be empty
          </small>

          <div className="feedback__submit-cancel-buttons">
            <button className="feedback__cancel-btn">Cancel</button>
            <button
              type="submit"
              className="feedback__submit-btn"
              onClick={handleSubmit}
            >
              Add Feedback
            </button>
          </div>
        </form>
      </main>
    </StyledContainer>
  );
};

export default AddFeedback;

const StyledContainer = styled.div`
  margin: 70px 0;
  width: 600px;

  nav {
    button {
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
  }

  main {
    position: relative;
    margin-top: 50px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px 30px;

    .feedback__add-icon {
      position: absolute;
      top: -27px;
      left: 30px;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      background-image: url(${gradientBackground});
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 15px;
        width: 15px;
      }
    }

    h1 {
      margin-top: 30px;
      font-size: 28px;
      color: #3a4374;
    }

    form {
      position: relative;

      margin-top: 25px;
      display: flex;
      flex-direction: column;

      label {
        color: #3a4374;
        font-weight: 600;
      }

      span {
        color: #647196;
        font-size: 14px;
      }

      input[type="text"],
      p,
      textarea {
        margin: 20px 0 30px;
        height: 50px;
        padding: 6px 10px;
        border: none;
        border-radius: 5px;
        background-color: #f7f8fd;
        outline: none;
        font-size: 16px;

        &:focus {
          border: 1px solid #4661e6;
        }

        &.feedback__input-category {
          caret-color: transparent;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;

          img {
            margin-right: 0;
            margin-left: auto;
            transform: rotate(270deg);
            height: 12px;
            width: 10px;
            margin-right: 5px;
            transition: transform 0.3s ease-in-out;

            &.active {
              transform: rotate(90deg);
              transition: transform 0.3s ease-in-out;
            }
          }
        }

        &.feedback__input-details {
          margin-top: 20px;
          height: 110px;
          padding: 10px;
          resize: none;
        }

        &.error {
          border: 1px solid orangered;
          transition: border 0.2s ease-in-out;

          &:focus {
            outline: 2px dashed black;
          }
        }
      }

      small {
        font-size: 12px;
        color: orangered;
        transform: translateY(-32px);
        visibility: hidden;
        opacity: 0;
        transition: all 0.2s ease-in-out;

        &.show {
          transform: translateY(-25px);
          opacity: 1;
          visibility: visible;
        }

        &.error-title {
          top: 142px;
        }

        &.error-details {
          top: 488px;
        }

        &.error-category {
          top: 285px;
        }
      }

      .feedback__input-options {
        background: white;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 285px;
        width: 100%;
        z-index: 10;

        span {
          font-size: 16px;
          /* margin: 5px; */
          padding: 15px 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;

          &:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          &:hover {
            color: #ad1fea;
            font-weight: 600;
            transition: all 0.1s ease-in-out;
          }

          img {
            margin-right: 20px;
          }
        }
      }
    }

    .feedback__submit-cancel-buttons {
      align-self: flex-end;

      button {
        border-radius: 8px;
        border: none;
        padding: 12px 22px;
        color: #ffffff;
        font-weight: 600;
        cursor: pointer;

        &:focus {
          outline: 2px solid black;
        }

        &.feedback__cancel-btn {
          background-color: #3a4374;
          margin-right: 15px;

          &:hover {
            background-color: #656ea3;
            transition: background-color 0.3s ease-in-out;
          }
        }

        &.feedback__submit-btn {
          background-color: #ad1fea;

          &:hover {
            background-color: #c75af6;
            transition: background-color 0.3s ease-in-out;
          }
        }
      }
    }
  }
`;
