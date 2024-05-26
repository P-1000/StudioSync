import express from "express";
import db from "./config/Db.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK!");
});

app.listen(port, () => {
  console.log("connecting to DB >>>");
  db.connect()
    .then(() => {
      console.log("Connected to DB....");
    })
    .catch((e) => {
      console.log("Error connecting to DB....");
      console.log(e);
    });
  console.log(` app listening at port ${port}`);
});
