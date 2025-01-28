import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import myUserRoute from "./routes/MyUserRoute"
import {v2 as cloudinary} from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
dotenv.config();

const app = express(); // Middleware setup
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database! Finally From Desktop"));

// cloudinary \\
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server
app.listen(7000, () => {
  console.log(`Server is running on port localhost:7000`);
});