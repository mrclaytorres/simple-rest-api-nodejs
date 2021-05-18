const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

//Prevent Deprecation warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(process.env.MONGO_ATLASS_CLUSTER + process.env.MONGO_ATLAS_PW + process.env.MONGO_ATLAS_DBNAME);

//Use for activity logging
app.use(morgan("dev"));

//Parse body request so it is readable
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS error-handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONs") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

//Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
