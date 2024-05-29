import { ErrorHandler, TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieOption, sendToken } from "../utils/features.js";

const registerHandler = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name && !email && !password)
    return next(new ErrorHandler("please provide all fileds", 400));

  const existUser = await User.findOne({ email });
  if (existUser) return next(new ErrorHandler("User Already Exist", 400));

  const hashPass = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashPass });

  sendToken(user, res, 201, "User Created Successfully");
});
const loginHandler = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password)
    return next(new ErrorHandler("please provide all fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("invalid email or password", 404));
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("invalid email or password", 404));

  sendToken(user, res, 201, `welcome back ${user.name}`);
});

const logoutHandler = TryCatch(async (req, res, next) => {
  return res.status(200).cookie("Authentication", "", cookieOption).json({
    success: true,
    message: "logout successfully",
  });
});

export { registerHandler, loginHandler, logoutHandler };
