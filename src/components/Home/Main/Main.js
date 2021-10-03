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
import MainMobileOverlay from "./MainMobileOverlay";
import { motion, AnimatePresence } from "framer-motion";

const Main = ({ showMobile }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [buttonText, setButtonText] = useState("Most Upvotes");
  const [buttonId, setButtonId] = useState("1");
  const [selections, setSelections] = useState([]);
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.data.productRequests);
  const suggestionsLength = feedbacks.filter(
    (item) => item.status === "suggestion"
  ).length;
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
    const suggestions = feedbacks.filter(
      (feedback) => feedback.status === "suggestion"
    );

    if (category && category !== "all") {
      setSelections(
        suggestions.filter(
          (suggestion) =>
            suggestion.category.toLowerCase() === category.toLowerCase()
        )
      );

      implementSort(buttonText);
    } else {
      setSelections(suggestions);
      implementSort(buttonText);
    }
  }, [dispatch, category, buttonText, feedbacks]);

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

  const showOptionsVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <MainContainer selectionsLength={selections.length}>
      <div className="main__header">
        <div className="main__header-suggestion">
          <img src={suggestionIcon} alt="suggestion" />
          <p>{suggestionsLength} Suggestions</p>
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
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  className="selections-container"
                  ref={selectionsRef}
                  variants={showOptionsVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <button
          className="main__add-feedback"
          onClick={() => history.push("/add-feedback")}
        >
          <img src={plusIcon} alt="icon" /> <span>Add Feedback</span>
        </button>
      </div>

      <AnimatePresence>{showMobile && <MainMobileOverlay />}</AnimatePresence>

      <div className="main__feedback-container">
        {selections.length > 0 &&
          selections.map(
            (
              { upvotes, title, id, description, comments, category },
              index
            ) => (
              <Feedback
                upvotes={upvotes}
                title={title}
                id={id}
                description={description}
                comments={comments}
                category={category}
                key={id}
                selectionsLength={selections.length}
                index={index}
              />
            )
          )}
      </div>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main`
  flex: 0.8;
  margin-left: 25px;
  position: relative;

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
          transition: 0.1s ease-in-out;

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

  @media (max-width: 768px) {
    .main__header {
      border-radius: 0;

      .main__header-suggestion {
        display: none;
      }

      .main__header-sort {
        margin-left: 0;
      }
    }

    .main__feedback-container {
      margin-bottom: ${({ selectionsLength }) =>
        !selectionsLength ? "100vh" : "0"};
    }
  }

  @media (max-width: 425px) {
    .main__header {
      .main__header-sort {
        p,
        .header-select-options {
          font-size: 90%;

          .selections-container {
            left: -50px;
            p {
              font-size: 100%;
            }
          }
        }
      }

      .main__add-feedback {
        font-size: 90%;
      }
    }
  }

  @media (max-width: 375px) {
    .main__header {
      .main__add-feedback {
        img {
          margin: 0;
        }
        span {
          display: none;
        }
      }
    }
  }
`;
