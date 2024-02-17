import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "./context";

function Navbar() {
  const { user, setUser } = useGlobalState();

  const handleLogout = () => {
    // Perform the logout action
    setUser(false);
  };

  return (
    <div>
      <div>
        <h1 className="page-header">SimplyPlan</h1>
      </div>
      <div className="navbar">
        <div className="left-links">
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            Home
          </NavLink>
          {user && (
            <>
              <NavLink to="/events" className="nav-link" activeClassName="active-link">
                My Events
              </NavLink>
              <NavLink to="/create-event" className="nav-link" activeClassName="active-link">
                Create Event
              </NavLink>
            </>
          )}
        </div>
        <div className="right-links">
          {user ? (
            <NavLink to="/" className="nav-link" activeClassName="active-link" onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/sign-up-log-in" className="nav-link" activeClassName="active-link">
              Sign Up/Log In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
