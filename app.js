import express from "express";
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

const port = 4000;
const app = express();

// connected to db
connectDB("mongodb://localhost:27017");

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
  })
);

config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("api is working");
});

app.use("/users", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on ${port}`);
});
