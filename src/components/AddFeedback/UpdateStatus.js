import React, { useState } from "react";
import checkIcon from "../../assets/shared/icon-check.svg";

const UpdateStatus = ({ arrowLeftIcon }) => {
  const [dropdown, setDropdown] = useState(false);

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
    </>
  );
};

export default UpdateStatus;
