import mongoose from "mongoose";
import jwt from "jsonwebtoken"

// connet to db
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Authentication" })
    .then((c) => console.log(`db connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};

const sendToken = (user, res, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const cookieOption = {
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    sameSite: "none",
    secure: true,
    httpOnly: true,
  };

 return res.status(code).cookie("Authentication", token, cookieOption).json({
    success: true,
    message: message,
  });
};

export const cookieOption = {
  expires: new Date(0),
  sameSite: "none",
  secure: true,
  httpOnly: true,
};

export { connectDB, sendToken };
