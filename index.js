const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const { static } = require("./path/path");
const app = express();

app.use(express.json());
app.use(cors());
const carRoute = require("./router/car");
// const  page404  = require("./router/404");
// routes
app.use("/cars", carRoute);
// cors

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://mnazgul:qse8313656@cluster0.zutazhf.mongodb.net/carDatabase"
  )
  .then(() => {
    console.log("data base is conect");
  })
  .catch((err) => console.log("someting wrong", err));

// acesse

// view ejs
app.set("view engine", "ejs");
app.set("views", "view");
// routes

// app.use(page404);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`local server is runing at ${port}`);
});
