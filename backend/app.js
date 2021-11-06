const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddlware = require("./middleware/error");

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

// Middleware
app.use(express.json());
app.use(cookieParser());

// Middleware for error
app.use(errorMiddlware);

// Use Routes
app.use("/v1", product);
app.use("/v1", user);
app.use("/v1", order);

module.exports = app;
