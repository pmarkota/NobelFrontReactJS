import React from "react";
import { useMutation } from "react-query";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const playerLogin = async (username, password) => {
  console.log({ username, password });
  const response = await fetch(`${baseApiUrl}player/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("successful login");
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("id", data.id);
  }
  if (response.status === 401) {
    throw new Error("Wrong username or password");
  }

  return data;
};

const playerRegister = async (username, password) => {
  const response = await fetch(`${baseApiUrl}player/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("successful register");
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("id", data.id);
  }
  if (response.status === 401) {
    throw new Error("Wrong username or password");
  }

  return data;
};
const gameStart = async (playerId) => {
  const response = await fetch(`${baseApiUrl}game/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playerId }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Game started");
  }
  if (response.status === 401) {
    throw new Error("Wrong username or password");
  }

  return data;
};

export const gamePlay = async (gameId, playerId, userMove) => {
  const response = await fetch(`${baseApiUrl}game/play`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId, playerId, userMove }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log("Game started");
  }
  if (response.status === 401) {
    throw new Error("Something went wrong while playing the game");
  }

  return data;
};

export const useGamePlay = () => {
  const play = useMutation(({ gameId, playerId, userMove }) =>
    gamePlay(gameId, playerId, userMove)
  );
  return play;
};

export const useGameStart = () => {
  const start = useMutation(({ playerId }) => gameStart(playerId));
  return start;
};

export const usePlayerLogin = () => {
  const login = useMutation(({ username, password }) =>
    playerLogin(username, password)
  );
  return login;
};

export const usePlayerRegister = () => {
  const register = useMutation(({ username, password }) =>
    playerRegister(username, password)
  );
  return register;
};
