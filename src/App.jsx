import { Fragment, useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Welcome } from "./sites/Welcome/Welcome";
import { Register } from "./sites/NotLoggedIn/Register";

import { NotLoggedIn } from "./sites/NotLoggedIn/Login";
import { Error } from "./sites/Error/Error";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={loggedIn ? <Welcome /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!loggedIn ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={
              !loggedIn ? (
                <NotLoggedIn baseApiUrl={baseApiUrl} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
