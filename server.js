import express from 'express';
const app = express();
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();
// import dbConfig from "../config/dbConfig";
// app.use(express.json());
// // const userRoute = require("./routes/userRoute");
// // const adminRoute = require("./routes/adminRoute");
// // const contractorsRoute = require("./routes/contractorsRoute");
// const path = require("path");
// import mongoose from "mongoose";


// app.use("/api/user", userRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/doctor", doctorRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
