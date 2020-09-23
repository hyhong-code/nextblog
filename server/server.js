require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URL }));
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
