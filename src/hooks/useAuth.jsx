import React, { useState, useEffect } from "react";
import { player, register } from "../services/api";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const data = player(username, password);
    setUser(data);
  };
  const register = (username, password) => {
    const data = register(username, password);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  return { user, login, logout, isLoggedIn };
};
