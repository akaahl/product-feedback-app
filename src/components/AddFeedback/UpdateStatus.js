import React, { useState } from "react";
import checkIcon from "../../assets/shared/icon-check.svg";

const UpdateStatus = ({ arrowLeftIcon }) => {
  const [dropdown, setDropdown] = useState(false);
  const [buttonId, setButtonId] = useState("0");

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

  const handleUpdateStatus = (e) => {
    const key = e.charCode;
    const id = e.target.id;
    const status = e.target.textContent.trim();
    console.log(typeof id);

    const manageStatus = () => {
      setButtonId(id);
    };

    manageStatus();

    if (key === 13) manageStatus();
  };

  const showCheckIcon = (id) => {
    return buttonId === id ? <img src={checkIcon} alt="check" /> : null;
    // console.log(buttonId);
    // console.log(id);
  };

  return (
    <>
      <label htmlFor="updateStatus">Update Status</label>
      <span>Change feedback status</span>

      <p
        className="feedback__input-updateStatus"
        id="updateStatus"
        tabIndex="0"
        role="button"
        name="updateStatus"
        onClick={handleClick}
      >
        <img
          src={arrowLeftIcon}
          alt="arrow"
          className={dropdown ? "active" : ""}
        />
      </p>

      {dropdown && (
        <div className="feedback__input-options updateStatus">
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="1"
            onClick={handleUpdateStatus}
          >
            Suggestion {showCheckIcon("1")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="2"
            onClick={handleUpdateStatus}
          >
            Planned {showCheckIcon("2")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="3"
            onClick={handleUpdateStatus}
          >
            In-Progess {showCheckIcon("3")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="4"
            onClick={handleUpdateStatus}
          >
            Live {showCheckIcon("4")}
          </span>
        </div>
      )}
    </>
  );
};

export default UpdateStatus;
