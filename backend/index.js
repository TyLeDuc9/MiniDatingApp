require("dotenv").config();
const { connectDB } = require('./libs/db');
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express(); 
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});