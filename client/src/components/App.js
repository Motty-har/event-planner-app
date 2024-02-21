import React, { useEffect, useState } from "react";
import { useGlobalState } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ParentForm from "./ParentForm";
import Navbar from "./NavBar";
import LoadingPage from "./LoadingPage";
import DisplayEvents from "./DisplayEvents"
import CreateEventForm from "./CreateEventForm";
import Invitations from "./Invitations";
import CreateTasks from "./CreateTasks";
import Event from "./Event";

function App() {
  const { user, setUser, events, setEvents } = useGlobalState();
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
        setEvents(r.invitations)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false)
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
        <Route path="/events">
            <DisplayEvents />
        </Route>
        <Route path='/create-event'>
          <CreateEventForm />
        </Route>
        <Route path='/invitations/:event_id'>
          <Invitations />
        </Route>
        <Route path='/create-tasks/:event_id'>
          <CreateTasks />
        </Route>
        <Route path='/event/:event_id'>
          <Event />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
