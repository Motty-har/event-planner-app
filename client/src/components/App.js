import React from "react";
import ReactDOM from "react-dom";
import { useUserContext } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ParentForm from "./ParentForm";
import Navbar from "./NavBar";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/sign-up-log-in">
          <ParentForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
