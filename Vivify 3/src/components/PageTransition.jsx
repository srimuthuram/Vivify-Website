import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.15,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export default function PageTransition({ children, pageKey }) {
  return (
    <motion.div
      key={pageKey}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="page-transition-wrapper"
      style={{ width: "100%", minHeight: "80vh", backgroundColor: "#080b11" }}
    >
      {children}
    </motion.div>
  );
}