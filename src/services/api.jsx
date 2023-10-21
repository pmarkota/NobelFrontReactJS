import React from "react";
import { useMutation } from "react-query";

const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

const playerLogin = async (username, password) => {
  const response = await fetch(`${baseApiUrl}player/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
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
    localStorage.setItem("gameId", data.gameId);
  }
  if (response.status === 401) {
    throw new Error("Wrong username or password");
  }

  return data;
};

const gamePlay = async (gameId, playerId, userMove) => {
  const response = await fetch(`${baseApiUrl}game/play`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId, playerId, userMove }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("computerMove", data.computerMove);
    localStorage.setItem("result", data.result);
  }
  if (response.status === 401) {
    throw new Error("Something went wrong while playing the game");
  }

  return data;
};

const gameTerminate = async (gameId) => {
  const response = await fetch(`${baseApiUrl}game/terminate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gameId }),
  });
  const data = await response.json();
  if (response.ok) {
  }
  if (response.status === 401) {
    throw new Error("Something went wrong while playing the game");
  }

  return data;
};
const playerStats = async (playerId) => {
  const response = await fetch(`${baseApiUrl}game/statistics/` + playerId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    if (
      localStorage.getItem("wins") == 0 ||
      localStorage.getItem("wins") == null
    ) {
      localStorage.setItem("wins", 0);
    }
    if (
      localStorage.getItem("losses") == 0 ||
      localStorage.getItem("losses") == null
    ) {
      localStorage.setItem("losses", 0);
    }
    if (
      localStorage.getItem("ties") == 0 ||
      localStorage.getItem("ties") == null
    ) {
      localStorage.setItem("ties", 0);
    }

    localStorage.setItem("wins", data.wins);
    localStorage.setItem("losses", data.losses);
    localStorage.setItem("ties", data.ties);
  }
  if (response.status === 401) {
    throw new Error("Wrong username or password");
  }

  return data;
};

export const useGameTerminate = () => {
  const terminate = useMutation(({ gameId }) => gameTerminate(gameId));
  return terminate;
};
export const usePlayerStats = () => {
  const stats = useMutation(({ playerId }) => playerStats(playerId));
  return stats;
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
