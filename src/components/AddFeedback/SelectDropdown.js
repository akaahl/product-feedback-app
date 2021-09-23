import React, { useState, useEffect } from "react";
import checkIcon from "../../assets/shared/icon-check.svg";

const SelectDropdown = ({
  errorStatus,
  setErrorStatus,
  formData,
  setFormData,
  arrowLeftIcon,
  paramsId,
}) => {
  const [buttonId, setButtonId] = useState("0");
  const [dropdown, setDropdown] = useState(false);
  const [paramsCheckIcon, setParamsCheckIcon] = useState(false);

  const handleKeyPress = (e) => {
    if (e.charCode === 13) setDropdown(!dropdown);
  };

  const closeDropdown = () => {
    setDropdown(false);
    document.removeEventListener("click", closeDropdown);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDropdown(!dropdown);
    document.addEventListener("click", closeDropdown);
  };

  const showArrow = (id) => {
    return buttonId === id ? <img src={checkIcon} alt="check" /> : null;
  };

  const handleCategoryError = (e) => {
    const id = e.target.id;

    if (!formData[id]) {
      setErrorStatus({
        ...errorStatus,
        [id]: true,
      });
    }
  };

  const handleCategory = (e) => {
    const key = e.charCode;
    const id = e.target.id;
    const category = e.target.textContent.trim();

    const manageCategory = () => {
      setParamsCheckIcon(false);
      setButtonId(id);
      setFormData({
        ...formData,
        category,
      });
      setErrorStatus({
        ...errorStatus,
        category: false,
      });
      setDropdown(false);
    };
    manageCategory();

    if (key === 13) {
      manageCategory();
    }
  };

  const showParamsCheck = (category) => {
    return category === formData.category.toLowerCase() ? (
      <img src={checkIcon} alt="check" />
    ) : null;
  };

  useEffect(() => {
    if (paramsId) {
      setParamsCheckIcon(true);
    }
  }, [paramsId]);

  return (
    <>
      <p
        className={
          errorStatus.category
            ? "feedback__input-category error"
            : "feedback__input-category"
        }
        id="category"
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex="0"
        role="button"
        name="category"
        onBlur={handleCategoryError}
      >
        {formData.category}
        <img
          src={arrowLeftIcon}
          alt="arrow"
          className={dropdown ? "active" : ""}
        />
      </p>
      <small
        className={
          errorStatus.category ? "error-category show" : "error-category"
        }
      >
        Field cannot be empty
      </small>
      {dropdown && (
        <div className="feedback__input-options">
          <span
            name="category-option"
            tabIndex="0"
            role="button"
            id="1"
            onClick={handleCategory}
            onKeyPress={handleCategory}
          >
            UI {showArrow("1")} {paramsCheckIcon && showParamsCheck("ui")}
          </span>
          <span
            name="category-option"
            tabIndex="0"
            role="button"
            id="2"
            onClick={handleCategory}
            onKeyPress={handleCategory}
          >
            UX {showArrow("2")} {paramsCheckIcon && showParamsCheck("ux")}
          </span>
          <span
            name="category-option"
            tabIndex="0"
            role="button"
            id="3"
            onClick={handleCategory}
            onKeyPress={handleCategory}
          >
            Enhancement {showArrow("3")}{" "}
            {paramsCheckIcon && showParamsCheck("enhancement")}
          </span>
          <span
            name="category-option"
            tabIndex="0"
            role="button"
            id="4"
            onClick={handleCategory}
            onKeyPress={handleCategory}
          >
            Bug {showArrow("4")} {paramsCheckIcon && showParamsCheck("bug")}
          </span>
          <span
            name="category-option"
            tabIndex="0"
            role="button"
            id="5"
            onClick={handleCategory}
            onKeyPress={handleCategory}
          >
            Feature {showArrow("5")}{" "}
            {paramsCheckIcon && showParamsCheck("feature")}
          </span>
        </div>
      )}{" "}
    </>
  );
};

export default SelectDropdown;
