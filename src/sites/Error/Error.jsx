import { React, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Error({ loggedIn }) {
  const navigate = useNavigate();

  return (
    <>
      {loggedIn ? (
        <h1>Error Illegal Page</h1>
      ) : (
        <div>
          <h1>Please Login first</h1>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
}
