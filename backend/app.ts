const express = require("express");
const app = express();
app.use(express.json());

const product = require("./routes/productRoute");
const users = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", users);
module.exports = app;
