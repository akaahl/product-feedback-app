import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrowLeftIcon from "../assets/shared/icon-arrow-left.svg";
import newFeedbackIcon from "../assets/shared/icon-new-feedback.svg";
import editFeedbackIcon from "../assets/shared/icon-edit-feedback.svg";
import { useHistory } from "react-router";
import SelectDropdown from "../components/AddFeedback/SelectDropdown";
import { useDispatch } from "react-redux";
import { updateData } from "../actions/dataActions";
import { useParams } from "react-router-dom";
import UpdateStatus from "../components/AddFeedback/UpdateStatus";
import HandleButtons from "../components/AddFeedback/HandleButtons";
import { motion } from "framer-motion";

const AddFeedback = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState("");

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

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (id) {
      const data = JSON.parse(localStorage.getItem("data"));
      const feedback = data.productRequests.filter(
        (feedback) => feedback.id === +id
      )[0];

      setStatus(
        feedback.status[0].toUpperCase() + feedback.status.substring(1)
      );

      setFormData((form) => ({
        ...form,
        title: feedback.title,
        category:
          feedback.category[0].toUpperCase() + feedback.category.substring(1),
        details: feedback.description,
      }));
    }

    return null;
  }, [id]);

  const handleError = (e) => {
    const name = e.target.name;

    if (!formData[name]) {
      setErrorStatus((err) => ({
        ...err,
        [name]: true,
      }));
    } else {
      setErrorStatus((err) => ({
        ...err,
        [name]: false,
      }));
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

    const formArr = Object.entries(formData);
    const filledForm = formArr.every((data) => (data[1] !== "" ? true : false));

    if (filledForm) {
      const storage = JSON.parse(localStorage.getItem("data"));
      const lastId =
        storage.productRequests[storage.productRequests.length - 1].id;

      const userFeedback = {
        category: formData.category,
        comments: [],
        description: formData.details,
        id: lastId + 1,
        status: "suggestion",
        title: formData.title,
        upvoted: false,
        upvotes: 0,
      };

      storage.productRequests.push(userFeedback);
      localStorage.setItem("data", JSON.stringify(storage));
      dispatch(updateData(storage));
      history.push("/");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <StyledContainer
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { type: "spring", duration: 1 } }}
      exit={{ scale: 0, transition: { type: "spring", duration: 1 } }}
    >
      <nav>
        <button onClick={() => history.goBack()}>
          <img src={arrowLeftIcon} alt="arrow left" />
          Go back
        </button>
      </nav>

      <main>
        <div
          className={id ? "feedback__icon edit" : "feedback__icon add"}
        ></div>

        <h1>{id ? `Editing '${formData.title}'` : "Create A New Feedback"}</h1>

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
            paramsId={id}
          />

          {id && (
            <UpdateStatus
              arrowLeftIcon={arrowLeftIcon}
              status={status}
              setStatus={setStatus}
              paramsId={id}
            />
          )}

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

          {id ? (
            <HandleButtons
              paramsId={id}
              formData={formData}
              status={status}
              setErrorStatus={setErrorStatus}
            />
          ) : (
            <div className="feedback__submit-cancel-buttons">
              <button className="feedback__cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className="feedback__submit-btn"
                onClick={handleSubmit}
              >
                Add Feedback
              </button>
            </div>
          )}
        </form>
      </main>
    </StyledContainer>
  );
};

export default AddFeedback;

const StyledContainer = styled(motion.div)`
  margin: 70px 0;
  width: 800px;

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

    .feedback__icon {
      position: absolute;
      top: -27px;
      left: 30px;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;

      &.add {
        background-image: url(${newFeedbackIcon});
      }

      &.edit {
        background-image: url(${editFeedbackIcon});
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

        &.feedback__input-category,
        &.feedback__input-updateStatus {
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

        &.updateStatus {
          top: 445px;
        }

        span {
          font-size: 16px;
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

  @media (max-width: 768px) {
    width: 90%;

    main {
      padding: 15px;
      h1 {
        font-size: 20px;
      }
      form {
        .feedback__submit-cancel-buttons {
          margin-top: 15px;
          display: flex;
          flex-direction: column-reverse;
          align-self: initial;

          button {
            &.feedback__cancel-btn {
              margin: 10px 0 0;
            }
          }
        }
      }
    }
  }

  @media (max-width: 425px) {
    nav {
      button {
        font-size: 90%;
      }
    }

    main {
      h1 {
        font-size: 100%;
      }
      form {
        label,
        input[type="text"],
        p,
        textarea {
          font-size: 90%;
        }

        .feedback__input-options {
          top: 275px;

          span {
            font-size: 90%;
            padding: 10px 15px;
          }
        }
      }
    }
  }

  @media (max-width: 310px) {
    main {
      form {
        .feedback__input-options {
          top: 290px;
        }
      }
    }
  }

  @media (max-width: 280px) {
    main {
      form {
        .feedback__input-options {
          top: 315px;
        }
      }
    }
  }
`;
