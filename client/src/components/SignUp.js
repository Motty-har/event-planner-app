import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useUserContext } from "./context";

function SignUp({ setUser }) {
  const { logIn, setLogIn } = useUserContext();
  const [error, setError] = useState(false);
  const history = useHistory();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Must enter first name").max(30),
    lastName: yup.string().required("Must enter last name").max(30),
    email: yup.string().email("Invalid email format").required("Must enter email"),
    username: yup.string().required("Must enter username").min(3).max(20),
    password: yup.string().required("Must enter a password").min(7).max(30),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          } else {
            setError(true);
            throw new Error("Failed to sign up");
          }
        })
        .then((user) => {
          setUser(user);
          history.push("/");
        })
        .catch((error) => {
          console.error("Error during signup:", error);
        });
    },
  });

  return (
    <div className="parent-container">
      <div className="form-card">
        <h1 className="form-name">Sign Up</h1>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              className={formik.errors.firstName ? "error-input" : ""}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.errors.firstName && (
              <p style={{ color: "red", textAlign: "center" }}>
                {formik.errors.firstName}
              </p>
            )}
            <br />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              className={formik.errors.lastName ? "error-input" : ""}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.errors.lastName && (
              <p style={{ color: "red", textAlign: "center" }}>
                {formik.errors.lastName}
              </p>
            )}
            <br />
            <br />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={formik.errors.email ? "error-input" : ""}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <p style={{ color: "red", textAlign: "center" }}>
                {formik.errors.email}
              </p>
            )}
            <br />
            <br />
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className={formik.errors.username ? "error-input" : ""}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && (
              <p style={{ color: "red", textAlign: "center" }}>
                {formik.errors.username}
              </p>
            )}
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={formik.errors.password ? "error-input" : ""}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p style={{ color: "red", textAlign: "center" }}>
                {formik.errors.password}
              </p>
            )}
            {error ? (
              <p style={{ color: "red", textAlign: "center" }}>
                Username already exists
              </p>
            ) : null}
            <div className="submit-button-wrapper">
              <button className="submit-button">Submit</button>
            </div>
            <br />
            <div className="btn-wrapper">
              <p className="message">Don't have an account yet?</p>
              <button
                className="signup-btn"
                type="click"
                onClick={() => setLogIn(!logIn)}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;