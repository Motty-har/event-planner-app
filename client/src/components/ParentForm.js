import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useUserContext } from "./context";

function ParentForm() {
  const { logIn } = useUserContext();
  return logIn ? (
    <LogIn />
  ) : (
    <SignUp />
  );
}

export default ParentForm;
