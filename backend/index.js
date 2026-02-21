const dotenv = require('dotenv');
dotenv.config(); 
const { connectDB } = require("./libs/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const app = express();


const profileRoute = require("./routes/profileRoute");
const likeRoute = require("./routes/likeRoute");
const matchRoute = require("./routes/matchRoute");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/profile", profileRoute);
app.use("/api/like", likeRoute);
app.use("/api/match", matchRoute);


const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});