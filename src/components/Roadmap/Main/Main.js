import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Feedback from "./Feedback";
import { motion } from "framer-motion";

const Main = ({ status }) => {
  const [planned, setPlanned] = useState(null);
  const [inProgress, setInProgress] = useState(null);
  const [live, setLive] = useState(null);

  useEffect(() => {
    const feedbacks = JSON.parse(localStorage.getItem("data")).productRequests;

    setPlanned(feedbacks.filter((feedback) => feedback.status === "planned"));
    setInProgress(
      feedbacks.filter((feedback) => feedback.status === "in-progress")
    );
    setLive(feedbacks.filter((feedback) => feedback.status === "live"));
  }, []);

  const mainVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childrenVariants = {
    initial: {
      opacity: 0,
      y: 700,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <StyledMain
      status={status}
      className={
        status === "planned"
          ? "planned"
          : status === "in-progress"
          ? "in-progress"
          : "live"
      }
      variants={mainVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={
          status === "planned" ? "main__planned active" : "main__planned"
        }
        variants={childrenVariants}
        // initial="initial"
        // animate="animate"
      >
        <div className="main__header">
          <p className="main__header_category">Planned ({planned?.length})</p>
          <p>Ideas prioritized for research</p>
        </div>

        {planned &&
          planned.map(
            ({
              upvotes,
              title,
              id,
              description,
              comments,
              category,
              status,
            }) => (
              <Feedback
                upvotes={upvotes}
                title={title}
                id={id}
                description={description}
                comments={comments}
                category={category}
                key={id}
                status={status}
                roadmap={true}
              />
            )
          )}
      </motion.div>

      <motion.div
        className={
          status === "in-progress"
            ? "main__in-progress active"
            : "main__in-progress"
        }
        variants={childrenVariants}
        // initial="initial"
        // animate="animate"
      >
        <div className="main__header">
          <p className="main__header_category">
            In Progress ({inProgress?.length})
          </p>
          <p>Currently being developed</p>
        </div>

        {inProgress &&
          inProgress.map(
            ({
              upvotes,
              title,
              id,
              description,
              comments,
              category,
              status,
            }) => (
              <Feedback
                upvotes={upvotes}
                title={title}
                id={id}
                description={description}
                comments={comments}
                category={category}
                key={id}
                status={status}
                roadmap={true}
              />
            )
          )}
      </motion.div>

      <motion.div
        className={status === "live" ? "main__live active" : "main__live"}
        variants={childrenVariants}
        // initial="initial"
        // animate="animate"
      >
        <div className="main__header">
          <p className="main__header_category">Live ({live?.length})</p>
          <p>Released features</p>
        </div>

        {live &&
          live.map(
            ({
              upvotes,
              title,
              id,
              description,
              comments,
              category,
              status,
            }) => (
              <Feedback
                upvotes={upvotes}
                title={title}
                id={id}
                description={description}
                comments={comments}
                category={category}
                key={id}
                status={status}
                roadmap={true}
              />
            )
          )}
      </motion.div>
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled(motion.main)`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;

  .main__planned,
  .main__in-progress,
  .main__live {
    flex: 0.3;

    .main__header {
      p {
        color: #647196;
      }
      .main__header_category {
        color: #3a4374;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 170px;
    transition: left 0.2s ease-in-out;
    left: ${({ status }) =>
      status === "planned"
        ? "-2vw"
        : status === "in-progress"
        ? "-107vw"
        : "-212vw"};
    justify-content: space-between;
    padding-left: 20px;
    transition: none;
    /* margin-bottom: 20px; */

    .main__planned,
    .main__in-progress,
    .main__live {
      /* flex: 1; */
      width: 100vw;
      padding: 20px 0 0 20px;
    }
  }

  @media (max-width: 375px) {
    .main__planned,
    .main__in-progress,
    .main__live {
      padding: 20px 20px 0 20px;
    }
  }

  @media (max-width: 280px) {
    .main__planned,
    .main__in-progress,
    .main__live {
      padding: 20px 0px 0 0;
    }
  }
`;
