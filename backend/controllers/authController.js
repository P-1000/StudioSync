import db from "../config/Db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username || !role) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  // todo : validate email, password, username, role
  // todo : more validation

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error checking or inserting user into DB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  //todo : more validation

  try {
    //todo : optimize this query
    const userQuery = `
      SELECT * FROM users WHERE email = $1 OR username = $1
    `;
    const userResult = await db.query(userQuery, [identifier]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const user = userResult.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({
      token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
