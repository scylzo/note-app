import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/note-app")
  .then(() => {
    console.log("Connected to DB ! ");
  })
  .catch((error) => {
    console.log("DB connexion Failed : ", error);
  });
