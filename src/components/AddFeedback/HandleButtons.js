import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateData } from "../../actions/dataActions";

const HandleButtons = ({ paramsId, formData, status, setErrorStatus }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("data"));
    const updatedFeedbacks = data.productRequests.filter(
      (feedback) => feedback.id !== +paramsId
    );
    const updatedData = { ...data, productRequests: updatedFeedbacks };

    localStorage.setItem("data", JSON.stringify(updatedData));
    dispatch(updateData(updatedData));
    history.push("/");
  };

  const handleSave = (e) => {
    e.preventDefault();

    const keys = Object.keys(formData);
    keys.forEach((key) => {
      if (!formData[key]) {
        setErrorStatus((err) => ({ ...err, [key]: true }));
      }
    });

    const formArr = Object.entries(formData);
    const filledForm = formArr.every((data) => data[1]);

    if (filledForm && status) {
      const data = JSON.parse(localStorage.getItem("data"));
      const updatedFeedbacks = data.productRequests.map((feedback) =>
        feedback.id === +paramsId
          ? {
              ...feedback,
              category: formData.category,
              description: formData.details,
              title: formData.title,
              status: status.toLowerCase(),
            }
          : feedback
      );

      const updatedData = {
        ...data,
        productRequests: updatedFeedbacks,
      };

      localStorage.setItem("data", JSON.stringify(updatedData));
      dispatch(updateData(updatedData));
      history.push("/");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <StyledHandleButtons>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>

      <div className="feedback__handleButtons">
        <button className="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </StyledHandleButtons>
  );
};

export default HandleButtons;

const StyledHandleButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    border-radius: 8px;
    border: none;
    padding: 12px 22px;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);

    &:focus {
      outline: 2px solid black;
    }

    &:active {
      transform: scale(0.92);
    }

    &.delete {
      background-color: #d73737;

      &:hover {
        background-color: #e98888;
      }
    }

    &.cancel {
      background-color: #3a4374;
      margin-right: 15px;

      &:hover {
        background-color: #656ea3;
      }
    }

    &.save {
      background-color: #ad1fea;

      &:hover {
        background-color: #c75af6;
      }
    }
  }
`;
