import express from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/register", registerHandler);
app.post("/login", loginHandler);

app.use(isAuthenticated);
app.get("/logout", logoutHandler);

export default app;
