import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { usePlayerStats } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Statistics = () => {
  const navigate = useNavigate();
  const playerId = localStorage.getItem("id");
  const statsMutation = usePlayerStats();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await statsMutation.mutateAsync({ playerId });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [playerId]);

  const wins = statsMutation.data?.wins || 0;
  const losses = statsMutation.data?.losses || 0;
  const ties = statsMutation.data?.ties || 0;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen pt-16 mx-auto text-center text-white bg-gray-800">
        <h1 className="text-4xl ">Your statistics VS the Computer</h1>
        <motion.div
          className="px-16 py-16 pb-5 mx-auto mt-10 bg-gray-700 rounded-lg w-fit"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <p>
            <span className="text-green-400">
              <span className="font-bold">Wins</span>: {wins}
            </span>
          </p>
          <p>
            <span className="text-red-600">
              <span className="font-bold">Losses</span>: {losses}
            </span>
          </p>
          <p>
            {" "}
            <span className="text-orange-400">
              <span className="font-bold">Ties</span>: {ties}
            </span>
          </p>
          <div className="mt-10">😭Not Satisfied?😭</div>
          <div
            onClick={() => navigate("/")}
            className="p-3 mx-auto mt-5 bg-green-400 rounded-lg shadow-lg cursor-pointer shadow-green-500 hover:shadow-green-700 hover:bg-green-500 hover:shadow-xl w-fit"
          >
            Play More
          </div>
        </motion.div>
      </div>
    </div>
  );
};
