import React, { useState } from "react";
import checkIcon from "../../assets/shared/icon-check.svg";

const UpdateStatus = ({ arrowLeftIcon, status, setStatus, paramsId }) => {
  const [dropdown, setDropdown] = useState(false);
  const [buttonId, setButtonId] = useState("0");
  const [paramsCheckIcon, setParamsCheckIcon] = useState(true);

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

    const manageStatus = () => {
      setParamsCheckIcon(false);
      setButtonId(id);
      setStatus(status);
      setDropdown(false);
    };

    manageStatus();

    if (key === 13) manageStatus();
  };

  const showCheckIcon = (id) => {
    return buttonId === id ? <img src={checkIcon} alt="check" /> : null;
  };

  const showParamsCheck = (updateStatus) => {
    return status.toLowerCase() === updateStatus.toLowerCase() ? (
      <img src={checkIcon} alt="check" />
    ) : null;
  };

  //   useEffect(() => {
  //     if (paramsId) setParamsCheckIcon(true);

  //       setParamsCheckIcon(false);
  //   }, [paramsId]);

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
        onKeyPress={handleClick}
      >
        {status}
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
            onKeyPress={handleUpdateStatus}
          >
            Suggestion {showCheckIcon("1")}{" "}
            {paramsCheckIcon && showParamsCheck("suggestion")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="2"
            onClick={handleUpdateStatus}
            onKeyPress={handleUpdateStatus}
          >
            Planned {showCheckIcon("2")}{" "}
            {paramsCheckIcon && showParamsCheck("planned")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="3"
            onClick={handleUpdateStatus}
            onKeyPress={handleUpdateStatus}
          >
            In-Progess {showCheckIcon("3")}{" "}
            {paramsCheckIcon && showParamsCheck("in-progress")}
          </span>
          <span
            name="updateStatus-option"
            tabIndex="0"
            role="button"
            id="4"
            onClick={handleUpdateStatus}
            onKeyPress={handleUpdateStatus}
          >
            Live {showCheckIcon("4")}{" "}
            {paramsCheckIcon && showParamsCheck("live")}
          </span>
        </div>
      )}
    </>
  );
};

export default UpdateStatus;
