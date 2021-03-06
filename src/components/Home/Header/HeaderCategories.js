import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory, setButtonActive } from "../../../actions/dataActions";

const HeaderCategories = () => {
  const dispatch = useDispatch();

  const buttonActive = useSelector((state) => state.data.buttonActive);

  const handleClick = (e) => {
    e.preventDefault();

    const category = e.target.className.split(" ")[1];
    dispatch(filterCategory(category));

    const id = Number(e.target.id);
    dispatch(setButtonActive(id));
  };

  const toggleActiveStyles = (category, index) => {
    if (index === buttonActive) {
      return `category ${category} active`;
    } else {
      return `category ${category}`;
    }
  };

  return (
    <div className="header__categories">
      <div className="top">
        <button
          className={toggleActiveStyles("all", 1)}
          onClick={handleClick}
          id="1"
        >
          All
        </button>
        <button
          className={toggleActiveStyles("ui", 2)}
          onClick={handleClick}
          id="2"
        >
          UI
        </button>
        <button
          className={toggleActiveStyles("ux", 3)}
          onClick={handleClick}
          id="3"
        >
          UX
        </button>
      </div>

      <div className="mid">
        <button
          className={toggleActiveStyles("enhancement", 4)}
          onClick={handleClick}
          id="4"
        >
          Enhancement
        </button>
        <button
          className={toggleActiveStyles("bug", 5)}
          onClick={handleClick}
          id="5"
        >
          Bug
        </button>
      </div>

      <div className="bottom">
        <button
          className={toggleActiveStyles("feature", 6)}
          onClick={handleClick}
          id="6"
        >
          Feature
        </button>
      </div>
    </div>
  );
};

export default HeaderCategories;
