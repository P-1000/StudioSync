import axios from "axios";
import db from "../config/Db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      res.status(200).json({ user: user });
    } else {
      res
        .status(200)
        .json({ message: "already there", user: userResult.rows[0] });
    }
  } catch (error) {
    console.error("Error checking or inserting user into DB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  const { email, password, username, role } = req.body;
  if (!email || !password || !username || !role) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const userQuery = `
    SELECT * FROM users WHERE email = $1
  `;
    const userResult = await db.query(userQuery, [email]);
    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10, "secret");
    const insertUserQuery = `
      INSERT INTO users (email, password, username, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const insertResult = await db.query(insertUserQuery, [
      email,
      hashedPassword,
      username,
      role,
    ]);
    const user = insertResult.rows[0];
    res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error checking or inserting user into DB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  try {
    const userQuery = `
      SELECT * FROM users WHERE email = $1
    `;
    const userResult = await db.query(userQuery, [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error("Error checking or inserting user into DB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

