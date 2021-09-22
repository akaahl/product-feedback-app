import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import AddFeedback from "./pages/AddFeedback";
import FeedbackDetails from "./pages/FeedbackDetails";

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/roadmap">
            <Roadmap />
          </Route>

          <Route path="/add-feedback">
            <AddFeedback />
          </Route>

          <Route exact path="/edit-feedback/:id">
            <AddFeedback />
          </Route>

          <Route exact path="/feedback/:id">
            <FeedbackDetails />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;
