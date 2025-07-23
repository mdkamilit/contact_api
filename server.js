import express from "express";
import mongoose from "mongoose";
// import bodyParser from 'express'
// import { register } from "./Controllers/user.js";
import router from "./Routes/user.js";
import contactRouter from './Routes/contact.js'
import { config } from "dotenv";
//.env file setup
config({  path: "./.env" });

const app = express();
// const port = 5000;
app.use(express.json());

app.use("/api/user",router)
app.use("/api/contact",contactRouter)
// app.use("/",)


mongoose
  .connect(
    process.env.MONGODB_URI ,
    {
      dbName: "Nodejs_Mastery_Course",
    }
  )
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

// home route

app.get("/", (req, res) => {
  res.send("This is Home page working!");
});

// user routes
// @api name:usr description
//@api method :post
// @api endpoint :/ -  /api/user/register
const port = process.env.PORT ;

app.listen(port, () => console.log(`server running on port ${port}`));

