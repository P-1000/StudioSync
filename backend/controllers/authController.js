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
    console.error("Error checking in DB:", error);
  }
};

export const checkInDb = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const userInfo = await getUserInfo(accessToken);

    const { sub, name, email } = userInfo;
    const auth0_user_id = sub;
    const username = name;
    const userQuery = `
        SELECT * FROM users WHERE auth0_user_id = $1
      `;
    const userResult = await db.query(userQuery, [auth0_user_id]);
    let user;
    if (userResult.rows.length === 0) {
      const insertUserQuery = `
          INSERT INTO users (auth0_user_id, username, email)
          VALUES ($1, $2, $3)
          RETURNING *
        `;
      const insertResult = await db.query(insertUserQuery, [
        auth0_user_id,
        username,
        email,
      ]);
      user = insertResult.rows[0];
      res
        .status(200)
        .json({ user: user, message: "user Inserted Successfully!" });
    } else {
      res.status(200).json({ message: "already there" });
    }
  } catch (error) {
    console.error("Error checking or inserting user into DB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
