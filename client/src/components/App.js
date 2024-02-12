import React, { useEffect, useState } from "react";
import { useGlobalState } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ParentForm from "./ParentForm";
import Navbar from "./NavBar";
import LoadingPage from "./LoadingPage";

function App() {
  const { user, setUser } = useGlobalState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          setLoading(false);
          throw new Error("Failed to fetch user data");
        }
      })
      .then((r) => {
        setUser(r);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
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
