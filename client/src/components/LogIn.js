import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useUserContext } from "./context";

function LogIn() {
  const { logIn, setLogIn } = useUserContext();
  const [error, setError] = useState(false)
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setError(true)
            throw new Error("Failed to log in");
          }
        })
        .then((user) => {
          history.push('/');
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    },
  });

  return (
    <div className="parent-container">
      <div className="form-card">
        <h1 className="form-name">Log In</h1>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            /><br /><br />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {error ? <p style={{ color: 'red', textAlign: 'center' }}>Username or Password is inccorect</p> : null}
            <div className="submit-button-wrapper">
              <button className="submit-button" type="submit">Submit</button>
            </div><br />
            <div className="btn-wrapper">
              <p className="message">Don't have an account yet?</p>
              <button className="signup-btn" type="button" onClick={() => setLogIn(!logIn)}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
