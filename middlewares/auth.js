import { User } from "../models/user.js";
import { ErrorHandler } from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["Authentication"];

  if (!token)
    return next(
      new ErrorHandler("please logn first to access this route", 400)
    );

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decodedData);

    req.user = await User.findById({ _id: decodedData._id });

    next();
  } catch (error) {
    next(error)
  }
};

export { isAuthenticated };
