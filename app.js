import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";

const port = process.env.PORT || 5000;
const app = express();
config({
  path: "./.env",
});

// connected to db
connectDB(process.env.MONGO_URI);

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.VITE_SERVER,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/users", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
