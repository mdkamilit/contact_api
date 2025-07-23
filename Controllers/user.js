import { User } from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (name == "" || email == "" || password == "") {
    return res.json({
      message: "All fields are required",
    });
  }
  let users = await User.findOne({ email });
  if (users)
    return res.json({ message: "User already exists", success: false });
  const hashPassword = await bcrypt.hash(password, 10);
  users = await User.create({ name, email, password: hashPassword });
  res.json({ message: "User created sucessfully", users });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (
    email == "" || password == "") {
    return res.json({
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "user not exists", success: false });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.json({ message: "Invalid Password", succes: false });

  const token=jwt.sign({userId:user._id},process.env.JWT,{
    expiresIn:'2d'
  })
  res.json({ message: `Weclome ${user.name}`,token, succes: true });
};
