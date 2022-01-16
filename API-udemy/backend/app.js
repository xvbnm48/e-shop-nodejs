const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors());

require("dotenv/config");

// env
const api = process.env.API_URL;

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//routers
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const usersRouter = require("./routers/users");

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    // userNewUrlParser: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Success Connected to database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
