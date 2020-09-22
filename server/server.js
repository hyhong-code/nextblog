require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = requier("cors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
