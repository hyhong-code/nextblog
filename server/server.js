require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const categoryRouter = require("./routes/category");

const app = express();
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
}

// Mount Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/categories", categoryRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));
