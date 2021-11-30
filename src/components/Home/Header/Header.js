import styled from "styled-components";
import DesktopHeader from "../../../assets/suggestions/desktop/background-header.png";
import TabletHeader from "../../../assets/suggestions/tablet/background-header.png";
import hamburgerIcon from "../../../assets/shared/mobile/icon-hamburger.svg";
import closeIcon from "../../../assets/shared/mobile/icon-close.svg";
import HeaderCategories from "./HeaderCategories";
import HeaderRoadmap from "./HeaderRoadmap";

const Header = ({ showMobile, setShowMobile }) => {
  const closeMobileNav = (e) => {
    e.preventDefault();
    document.body.style.overflowY = "scroll";
    setShowMobile(false);
    document.removeEventListener("click", closeMobileNav);
  };

  const handleMobileNav = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (showMobile) {
      document.body.style.overflowY = "scroll";
      setShowMobile(false);
    } else {
      document.body.style.overflowY = "hidden";
      setShowMobile(true);
      document.addEventListener("click", closeMobileNav);
    }
  };

  return (
    <StyledHeader>
      <div className="header__feedback-board">
        <h3>Frontend Mentor</h3>
        <p>Feedback Board</p>

        {!showMobile && (
          <button
            className="header__feedback-board-btns open"
            onClick={handleMobileNav}
          >
            <img src={hamburgerIcon} alt="hamburger open nav" />
          </button>
        )}

        {showMobile && (
          <button
            className="header__feedback-board-btns close"
            onClick={handleMobileNav}
          >
            <img src={closeIcon} alt="close nav" />
          </button>
        )}
      </div>

      <HeaderCategories />
      <HeaderRoadmap />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  margin-top: 0;

  .header__feedback-board {
    position: relative;
    height: 150px;
    padding: 10px 20px;
    background-image: url(${DesktopHeader});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    h3,
    p {
      color: #ffffff;
    }

    h3 {
      margin-bottom: 0;
    }

    p {
      margin: 10px 0;
    }

    .header__feedback-board-btns {
      display: none;
      position: absolute;
      top: 50%;
      right: 35px;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;

      img {
        height: 16px;
        width: 19px;
      }
    }
  }

  .header__categories {
    background: #ffffff;
    padding: 20px;
    height: 190px;
    border-radius: 10px;
    margin-top: 20px;

    .top,
    .mid,
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 13px;

      button {
        padding: 10px 14px;
        border: none;
        border-radius: 10px;
        background: #f2f4ff;
        color: #4661e6;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background: rgba(70, 97, 230, 0.7);
          color: #ffffff;
          transition: 0.2s ease-in-out;
        }

        &:active {
          transform: scale(0.92);
          transition: none;
        }

        &.active {
          background: #4661e6;
          color: #ffffff;
        }
      }
    }

    .top {
      margin-top: 0px;

      button {
        padding: 10px 18px;
      }
    }
  }

  .header__roadmap {
    height: 170px;
    padding: 20px;
    background: #ffffff;
    margin-top: 20px;
    border-radius: 10px;

    .header__roadmap-view {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        color: #3a4374;
        font-weight: 700;
      }

      a {
        color: #4661e6;
        font-weight: 700;
        font-size: 14px;
      }
    }

    .header__roadmap-categories {
      margin-top: 15px;
      .category {
        display: flex;
        align-items: center;

        &:not(:first-child) {
          margin-top: 6px;
        }

        .circle {
          height: 8px;
          width: 8px;
          border-radius: 50%;

          &.orange {
            background-color: #f49f85;
          }

          &.purple {
            background-color: #ad1fea;
          }

          &.green {
            background-color: #62bcfa;
          }
        }

        p {
          flex: 1;
          margin: 0;
          margin-left: 15px;
          font-weight: 500;
          color: #647196;
        }

        span {
          color: #647196;
          font-weight: 800;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .header__feedback-board,
    .header__categories,
    .header__roadmap {
      margin-top: 0;
      margin-bottom: 40px;
      height: 190px;
      flex: 0.3;
    }
  }

  @media (max-width: 768px) {
    .header__feedback-board {
      background-image: url(${TabletHeader});
      flex: 1;
      margin: 0;
      border-radius: 0;
      height: 100px;

      .header__feedback-board-btns {
        display: flex;
      }
    }

    .header__categories,
    .header__roadmap {
      display: none;
      margin: 0;
    }
  }

  @media (max-width: 425px) {
    .header__feedback-categories,
    .header__feedback-board,
    .header__feedback-roadmap {
      font-size: 90%;
    }
  }
`;
