import React from "react";
import { LoginView } from "./LoginView";

export const NotLoggedIn = ({ baseApiUrl }) => {
  return (
    <div>
      <LoginView baseApiUrl={baseApiUrl}></LoginView>
    </div>
  );
};
