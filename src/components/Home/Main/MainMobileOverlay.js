import React from "react";
import styled from "styled-components";
import HeaderCategories from "../Header/HeaderCategories";
import HeaderRoadmap from "../Header/HeaderRoadmap";
import { motion } from "framer-motion";

const MainMobileOverlay = () => {
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
  };

  const childVariants = {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  };
  return (
    <StyledContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="main__overlay-container"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        variants={childVariants}
      >
        <HeaderCategories />
        <HeaderRoadmap />
      </motion.div>
    </StyledContainer>
  );
};

export default MainMobileOverlay;

const StyledContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 10;

  .main__overlay-container {
    background-color: #ffffff;
    height: 100vh;
    width: 250px;
    margin: 0 0 0 auto;

    .header__categories {
      background: #ffffff;
      padding: 30px;
      height: 190px;
      border-radius: 10px;

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
      padding: 30px;
      background: #ffffff;
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
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
