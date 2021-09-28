import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Feedback from "./Feedback";

const Main = () => {
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

  return (
    <StyledMain>
      <div className="main__planned">
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
              />
            )
          )}
      </div>

      <div className="main__in-progress">
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
              />
            )
          )}
      </div>

      <div className="main__live">
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
              />
            )
          )}
      </div>
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
  /* min-width: 100vw; */

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
    top: 150px;
    left: 0;
    justify-content: space-between;
    padding-left: 20px;

    .main__planned,
    .main__in-progress,
    .main__live {
      /* flex: 1; */
      width: 100vw;
    }
  }
`;
