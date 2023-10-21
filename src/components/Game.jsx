import React, { useEffect, useState } from "react";
import rock from "../assets/rock.png";
import paper from "../assets/paper.png";
import scissors from "../assets/scissors.png";
import { useGamePlay } from "../services/api";
import { motion } from "framer-motion";

export const Game = ({ gameStarted, setGameStarted, gameLoading }) => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [computerSign, setComputerSign] = useState(null);

  const [throwCount, setThrowCount] = useState(0);

  const gameId = localStorage.getItem("gameId");
  const playerId = localStorage.getItem("id");
  const gamePlayMutation = useGamePlay();

  const computerMove = localStorage.getItem("computerMove");
  const result = localStorage.getItem("result");
  const handleGamePlay = async () => {
    console.log(selectedSign);

    try {
      const data = await gamePlayMutation.mutateAsync({
        gameId,
        playerId,
        userMove: selectedSign,
      });
      console.log(computerMove);
    } catch (error) {
      console.error(error);
    }
  };
  return gameLoading ? (
    <div className="w-full mx-auto text-center py-72">
      Wait here while we are loading your game...
    </div>
  ) : (
    <div>
      <div className="flex flex-row items-center justify-center w-full h-full">
        <motion.img
          src={rock}
          alt="rock"
          className="p-3 mr-3 transition-shadow duration-300 ease-in-out rounded-full shadow-lg cursor-pointer shadow-gray-900 hover:shadow-gray-500 hover:shadow-xl"
          onClick={() => {
            setSelectedSign((prev) => "rock");
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedSign === "rock" ? 1.5 : 1,
            marginRight: selectedSign === "rock" ? 30 : 12,
            transition: "all 0.2s ease-in-out",
          }}
        />
        <motion.img
          src={paper}
          alt="paper"
          className="p-3 mr-3 transition-shadow duration-300 ease-in-out rounded-full shadow-lg cursor-pointer shadow-blue-900 hover:shadow-blue-500 hover:shadow-xl"
          onClick={() => {
            setSelectedSign((prev) => "paper");
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedSign === "paper" ? 1.5 : 1,
            marginRight: selectedSign === "paper" ? 30 : 12,
            marginLeft: selectedSign === "paper" ? 18 : 0,
            transition: "all 0.2s ease-in-out",
          }}
        />
        <motion.img
          src={scissors}
          alt="scissors"
          className="p-3 transition-shadow duration-300 ease-in-out rounded-full shadow-lg cursor-pointer shadow-red-900 hover:shadow-red-500 hover:shadow-xl"
          onClick={() => {
            setSelectedSign((prev) => "scissors");
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: selectedSign === "scissors" ? 1.5 : 1,
            marginRight: selectedSign === "scissors" ? 30 : 12,
            marginLeft: selectedSign === "scissors" ? 18 : 0,
            transition: "all 0.2s ease-in-out",
          }}
        />
        <br />
      </div>
      <motion.div
        className="px-3 py-2 mx-auto mt-10 text-white bg-green-400 rounded-lg shadow-lg cursor-pointer w-fit shadow-green-500 "
        whileHover={{ scale: 1.5, y: 10 }}
        onClick={() => {
          handleGamePlay();
          setComputerSign(computerMove);
          setThrowCount((prev) => prev + 1);
        }}
      >
        Throw!
      </motion.div>
      <div>
        <h1 className="mt-10 text-3xl font-bold text-red-500">
          <i>...computer's move...</i>
        </h1>
        {throwCount > 0 && (
          <motion.img
            src={
              computerMove === "rock"
                ? rock
                : computerMove === "paper"
                ? paper
                : scissors
            }
            alt="Computer's Move"
            className="w-24 mx-auto mt-10"
            initial={{ scale: 0, x: -100 }}
            animate={{ scale: 1, x: 0 }}
          />
        )}
        {throwCount > 0 && (
          <motion.h1
            className="mt-10 text-3xl font-bold text-black-500"
            initial={{ scale: 0, x: -100 }}
            animate={{ scale: 1, x: 0 }}
          >
            <i>...{result}...</i>
          </motion.h1>
        )}
      </div>
    </div>
  );
};
