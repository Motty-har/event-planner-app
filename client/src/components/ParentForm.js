import React, { useEffect } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useGlobalState } from "./context";

function ParentForm() {
  const { logIn, setLogIn} = useGlobalState();
  
  useEffect(() => {
    setLogIn(false);
  }, []);

  return logIn ? (
    <LogIn />
  ) : (
    <SignUp />
  );
}

export default ParentForm;
