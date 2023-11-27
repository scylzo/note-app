import express from "express";
import cors from "cors";
import "./db";
import noteRouter from "./routers/note";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/note", noteRouter);

app.listen(8000, () => console.log("App is listening on port 8000"));
