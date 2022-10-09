const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");
const { errorHandler } = require("./utils/ErrorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(router);
app.use(errorHandler);

module.exports = app;
