import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Game } from "../components/Game";
import { useFetcher, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGameStart, useGameTerminate } from "../services/api";

export const Welcome = () => {
  const [showRules, setShowRules] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const playerId = localStorage.getItem("id");

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const gameStartMutation = useGameStart();
  const gameTerminateMutation = useGameTerminate();
  const gameId = localStorage.getItem("gameId");
  const handleGameStart = async () => {
    try {
      await gameStartMutation.mutateAsync({ playerId });
      setGameStarted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameStop = async () => {
    setGameStarted(false);
    try {
      await gameTerminateMutation.mutateAsync({ gameId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pb-3 bg-gray-800">
        <h1 className="pt-5 mx-auto text-white w-fit">
          👋 Welcome{" "}
          <span className="font-bold text-blue-500 ">{username}👋</span>
        </h1>
        <div className="max-h-fit">
          <motion.div
            className="p-10 mx-auto mt-5 mb-10 text-center text-white bg-gray-700 rounded-lg shadow-lg shadow-gray-600 w-fit"
            initial={{ scale: 0 }}
            animate={{
              scale: showRules ? 1 : 0,
              display: showRules ? "block" : "none",
            }}
            transition={{ bounce: 0.3, type: "spring" }}
          >
            <h2 className="font-bold text-blue-500">📜Rules</h2>
            <p className="inline text-white">
              <span className="font-bold text-gray-400">Rock</span> beats{" "}
              <span className="text-red-400">Scissors</span> <br />
              <span className="text-red-400">Scissors</span> beats{" "}
              <span className="font-bold">Paper</span> <br />
              <span className="font-bold">Paper</span> beats{" "}
              <span className="font-bold text-gray-400">Rock</span>
            </p>
          </motion.div>
          <motion.div
            className="p-10 mx-auto mt-5 mb-10 text-center text-white bg-gray-700 rounded-lg shadow-lg shadow-gray-600 w-fit"
            initial={{ scale: 0 }}
            animate={{
              scale: showRules ? 1 : 0,
              display: showRules ? "block" : "none",
            }}
            transition={{ bounce: 0.3, type: "spring" }}
          >
            <h2 className="font-bold text-blue-500">📜How to play</h2>
            <p className="text-white">
              <span className="font-bold text-gray-400">1.</span> Click on the
              <span className="font-bold text-blue-500"> Play </span>button to
              start a game <br />
              <span className="font-bold text-gray-400">2.</span> Choose one of
              the three options <br />
              <span className="font-bold text-gray-400">3.</span> Wait for your
              opponent to choose <br />
              <span className="font-bold text-gray-400">4.</span> See who won
            </p>
          </motion.div>
        </div>
      </div>
      <div className="min-h-screen pt-10 mx-auto text-center bg-green-100">
        {gameStarted && (
          <h1 className="text-3xl font-bold text-red-500">Game started</h1>
        )}
        {!gameStarted ? (
          <motion.div
            className="px-3 py-2 mx-auto text-white bg-green-400 rounded-lg shadow-lg cursor-pointer w-fit shadow-green-500 "
            whileHover={{ scale: 1.5, y: 10 }}
            onClick={() => {
              setShowRules(!showRules);
              if (showRules) {
                handleGameStart();
              }
            }}
          >
            Play now
          </motion.div>
        ) : (
          <motion.div
            className="px-3 py-2 mx-auto text-white bg-red-400 rounded-lg shadow-lg cursor-pointer w-fit shadow-red-500 "
            whileHover={{ scale: 1.5, y: 10 }}
            onClick={() => {
              setShowRules(!showRules);
              if (!showRules) {
                handleGameStop();
              }
            }}
          >
            Stop playing
          </motion.div>
        )}
        <motion.div
          className="mt-28"
          initial={{ scale: 0 }}
          animate={{ scale: showRules ? 0 : 1 }}
        >
          <Game
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            gameLoading={gameStartMutation.isLoading}
          />
        </motion.div>
      </div>
    </div>
  );
};
