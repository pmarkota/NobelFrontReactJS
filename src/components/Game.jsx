import React, { useEffect, useState } from "react";
import rock from "../assets/rock.png";
import paper from "../assets/paper.png";
import scissors from "../assets/scissors.png";
import { useGamePlay, gamePlay } from "../services/api";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

export const Game = ({ gameStarted, setGameStarted, gameLoading }) => {
  const [selectedSign, setSelectedSign] = useState(null);

  const gameId = localStorage.getItem("gameId");
  const playerId = localStorage.getItem("id");
  const gamePlayMutation = useGamePlay();

  const postGamePlay = useMutation(({ gameId, playerId, userMove }) =>
    gamePlay(gameId, playerId, userMove)
  );

  const handleGamePlay = () => {
    console.log("handlegameplay");
    console.log(selectedSign);

    postGamePlay.mutate({ gameId, playerId, userMove: selectedSign });
    if (postGamePlay.isLoading) {
      console.log("loading");
    }
    if (postGamePlay.isSuccess) {
      console.log(postGamePlay.data);
    }
    if (postGamePlay.isError) {
      console.log(postGamePlay.error);
    }

    // try {
    //   await gamePlayMutation.mutateAsync({
    //     gameId,
    //     playerId,
    //     userMove: selectedSign,
    //   });

    //   if (gamePlayMutation.isSuccess) {
    //     console.log(gamePlayMutation.data);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
        onClick={handleGamePlay}
      >
        Throw!
      </motion.div>
    </div>
  );
};
