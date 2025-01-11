import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import myUserRoute from "./routes/MyUserRoute"

dotenv.config();

const app = express(); // Middleware setup
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database! Finally From Desktop"));


app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.use("/api/my/user", myUserRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server
app.listen(7000, () => {
  console.log(`Server is running on port localhost:7000`);
});