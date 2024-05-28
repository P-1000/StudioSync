import axios from "axios";
import db from "../config/Db.js";

const getUserInfo = async (token) => {
  try {
    const response = await axios.get(
      "http://bankaidayo.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const userInfo = (await response).data;
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    console.error("error getting user info", error);
  }
};

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const userInfo = await getUserInfo(accessToken);
    req.user = userInfo;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//todo : error handling for verifyToken , if token is invalid or expired
