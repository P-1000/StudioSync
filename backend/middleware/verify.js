import axios from "axios";
import db from "../config/Db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.status(403).send("Access token is invalid");
      }
      req.user = user;
      req.user.id = user.id;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//todo : error handling for verifyToken , if token is invalid or expired
