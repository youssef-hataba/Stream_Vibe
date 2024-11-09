"use client";
import { motion } from "framer-motion";

const MovieWall = () => {
  return (
    <>
      <motion.div
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          duration: 40, 
          repeat: Infinity, 
          ease: "linear", 
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw", 
          height: "100vh", 
          backgroundImage: "url('/moviewall.png')", 
          backgroundSize: "cover",
          backgroundPosition: "0 0, 100% 0", 
        }}
      />

      <motion.div
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          duration: 40, 
          repeat: Infinity, 
          ease: "linear",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: "100vw", 
          width: "100vw", 
          height: "100vh",
          backgroundImage: "url('/moviewall.png')", 
          backgroundSize: "cover", 
          backgroundPosition: "0 0, 100% 0", 
        }}
      />
    </>
  );
};

export default MovieWall;