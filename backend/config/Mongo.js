import mongoose from "mongoose";

const connectToMongoDB = () => {
  console.log("waiting for the mongo connection....");
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to MongoDB....");
    })
    .catch((err) => {
      throw err;
    });
};

export { connectToMongoDB };
