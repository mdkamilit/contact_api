import jwt from "jsonwebtoken";
import { User } from "../Models/Users.js";
export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authentication");
  console.log(token);
  if (!token) return res.json({ msg: "Login first" });
  const decoded = jwt.verify(token, process.env.JWT);

  const id = decoded.userId;
  let user = await User.findById(id);
  if (!user) return res.json({ msg: "user not found" });
  req.user = user;
  next();
};
