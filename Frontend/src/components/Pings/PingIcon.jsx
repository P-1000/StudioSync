import React from "react";
import {
  FaUserPlus,
  FaInfoCircle,
  FaCheckCircle,
  FaCommentDots,
  FaBell,
  FaExclamationCircle,
  FaEnvelope,
  FaAt,
  FaFileUpload,
  FaFlagCheckered,
  FaQuestionCircle,
  FaSyncAlt,
  FaCogs,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";

const PingIcon = ({ type }) => {
  const icons = {
    invitation: <FaUserPlus className="text-blue-500" />,
    update: <FaInfoCircle className="text-yellow-500" />,
    task: <FaCheckCircle className="text-green-500" />,
    comment: <FaCommentDots className="text-purple-500" />,
    approval: <FaCheckCircle className="text-green-500" />,
    reminder: <FaBell className="text-red-500" />,
    deadline: <FaExclamationCircle className="text-red-500" />,
    message: <FaEnvelope className="text-blue-500" />,
    mention: <FaAt className="text-yellow-500" />,
    "file-upload": <FaFileUpload className="text-blue-500" />,
    milestone: <FaFlagCheckered className="text-green-500" />,
    "feedback-request": <FaQuestionCircle className="text-blue-500" />,
    "revision-request": <FaSyncAlt className="text-yellow-500" />,
    "system-alert": <FaCogs className="text-gray-500" />,
    "team-join": <FaUsers className="text-green-500" />,
    "collaboration-request": <FaHandshake className="text-blue-500" />,
    default: <FaInfoCircle className="text-gray-500" />,
  };

  return icons[type] || icons.default;
};

export default PingIcon;
