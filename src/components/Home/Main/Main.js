import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import suggestionIcon from "../../../assets/suggestions/icon-suggestions.svg";
import arrowIcon from "../../../assets/shared/icon-arrow.svg";
import checkIcon from "../../../assets/shared/icon-check.svg";
import plusIcon from "../../../assets/shared/icon-plus.svg";
import Feedback from "./Feedback";
import { useSelector, useDispatch } from "react-redux";
import { totalComments } from "../../../utils/utilityFunctions";
import { useHistory } from "react-router-dom";

const Main = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [buttonText, setButtonText] = useState("Most Upvotes");
  const [buttonId, setButtonId] = useState("1");
  const [selections, setSelections] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.data.category);
  const history = useHistory();
  const selectionsRef = useRef();

  // Function to implement user's selected sort option
  const implementSort = (selectedSort) => {
    if (selectedSort && selectedSort === "Most Upvotes") {
      setSelections((prevSelection) =>
        prevSelection.sort((a, b) => b.upvotes - a.upvotes)
      );
    }

    if (selectedSort && selectedSort === "Least Upvotes") {
      setSelections((prevSelection) =>
        prevSelection.sort((a, b) => a.upvotes - b.upvotes)
      );
    }

    if (selectedSort && selectedSort === "Most Comments") {
      setSelections((prevSelection) =>
        prevSelection.sort(
          (a, b) => totalComments(b.comments) - totalComments(a.comments)
        )
      );
    }

    if (selectedSort && selectedSort === "Least Comments") {
      setSelections((prevSelection) =>
        prevSelection.sort(
          (a, b) => totalComments(a.comments) - totalComments(b.comments)
        )
      );
    }
  };

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem("data")).productRequests;

    const suggestions = feedbacks.filter(
      (feedback) => feedback.status === "suggestion"
    );

    if (category && category !== "all") {
      setSelections(
        suggestions.filter((suggestion) => suggestion.category === category)
      );

      implementSort(buttonText);
    } else {
      setSelections(suggestions);
      implementSort(buttonText);
    }
  }, [dispatch, category, buttonText]);

  const suggestions = JSON.parse(
    localStorage.getItem("data")
  ).productRequests.filter((item) => item.status === "suggestion");

  const handleSelect = (e) => {
    e.stopPropagation();

    const selectedCategory = e.target.textContent.trim();
    const id = e.target.id;

    setButtonText(selectedCategory);
    setButtonId(id);
    implementSort(selectedCategory);
  };

  const showArrowIcon = (id) => {
    return buttonId === id ? <img src={checkIcon} alt="check" /> : "";
  };

  const closeOptions = () => {
    setShowOptions(false);
    document.removeEventListener("click", closeOptions);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowOptions(!showOptions);
    document.addEventListener("click", closeOptions);
  };

  return (
    <MainContainer>
      <div className="main__header">
        <div className="main__header-suggestion">
          <img src={suggestionIcon} alt="suggestion" />
          <p>{suggestions.length} Suggestions</p>
        </div>

        <div className="main__header-sort">
          <p>Sort By : </p>

          <button className="header-select-options" onClick={handleClick}>
            {buttonText}{" "}
            <img
              src={arrowIcon}
              alt="arrow"
              className={showOptions ? "active" : ""}
            />
            {showOptions && (
              <div className="selections-container" ref={selectionsRef}>
                <p onClick={handleSelect} id="1">
                  Most Upvotes {showArrowIcon("1")}
                </p>
                <p onClick={handleSelect} id="2">
                  Least Upvotes {showArrowIcon("2")}
                </p>
                <p onClick={handleSelect} id="3">
                  Most Comments {showArrowIcon("3")}
                </p>
                <p onClick={handleSelect} id="4">
                  Least Comments {showArrowIcon("4")}
                </p>
              </div>
            )}
          </button>
        </div>

        <button
          className="main__add-feedback"
          onClick={() => history.push("/add-feedback")}
        >
          <img src={plusIcon} alt="icon" /> Add Feedback
        </button>
      </div>

      {selections.length > 0 && (
        <div className="main__feedback-container">
          {selections.map(
            ({ upvotes, title, id, description, comments, category }) => (
              <Feedback
                upvotes={upvotes}
                title={title}
                id={id}
                description={description}
                comments={comments}
                category={category}
                key={id}
              />
            )
          )}
        </div>
      )}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main`
  flex: 0.8;
  margin-left: 25px;

  .main__header {
    background-color: #373f68;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;

    .main__header-suggestion {
      display: flex;
      align-items: center;

      p {
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        margin-left: 15px;
      }
    }

    .main__header-sort {
      margin-left: 20px;
      display: flex;
      align-items: center;
      color: #f2f4fe;

      p {
        font-size: 13px;
        font-weight: 500;
      }

      .header-select-options {
        background: none;
        border: none;
        color: #ffffff;
        outline: none;
        margin-left: 10px;
        font-weight: 600;
        cursor: pointer;
        font-size: 15px;
        position: relative;

        &:focus {
          outline: 2px dashed cyan;
        }

        img {
          height: 8px;
          margin-left: 5px;
          margin-bottom: 1px;
          transition: 0.3s ease-in-out;

          &.active {
            transform: rotate(180deg);
          }
        }

        .selections-container {
          position: absolute;
          top: 30px;
          background-color: #ffffff;
          border-radius: 15px;
          width: 200px;
          padding: 10px;
          box-shadow: 0 2px 15px rgba(97, 69, 69, 0.1);
          z-index: 10;

          p {
            color: #647196;
            padding: 10px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.4s ease-in-out;

            &:hover {
              color: #ad1fea;
            }

            img {
              height: 10px;
            }
          }
        }
      }
    }

    .main__add-feedback {
      background-color: #ad1fea;
      padding: 10px 20px;
      border-radius: 5px;
      margin-left: auto;
      margin-right: 0;
      border: none;
      display: flex;
      align-items: center;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: #c75af6;
        transition: all 0.3s ease-in-out;
      }

      &:active {
        transform: scale(0.92);
        transition: 0.1s ease-in;
      }

      &:focus {
        outline: 2px dashed cyan;
      }

      img {
        margin-right: 5px;
        font-weight: bolder;
      }
    }
  }

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;
