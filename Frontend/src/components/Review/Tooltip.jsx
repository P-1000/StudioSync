import React from "react";
import { motion } from "framer-motion";

const Tooltip = ({ text }) => {
  return (
    <motion.div
      className="bg-gray-800 text-white rounded-lg p-2 absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 pointer-events-none z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.div>
  );
};

export default Tooltip;
