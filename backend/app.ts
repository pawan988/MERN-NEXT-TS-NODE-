import errorHandler from "./middleware/error";

const express = require("express");
const app = express();
app.use(express.json());

const product = require("./routes/productRoute");

app.use("/api/v1", product);
app.use(errorHandler);
module.exports = app;
