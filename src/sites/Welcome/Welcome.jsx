import React, { useEffect } from "react";
import { NotLoggedIn } from "../NotLoggedIn/Login";
import { LoggedIn } from "../LoggedIn/LoggedIn";

export const Welcome = ({ baseApiUrl }) => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(false);
    }
  }, []);
  return (
    <div>
      {loggedIn ? (
        <NotLoggedIn baseApiUrl={baseApiUrl}></NotLoggedIn>
      ) : (
        <LoggedIn></LoggedIn>
      )}
    </div>
  );
};
