import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // if (req.path === "/login") {
  //   return next();
  // }

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decoded = jwt.verify(token, "secret");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).send("Access token is invalid");
  }
};
