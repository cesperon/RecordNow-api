const express = require("express");
const path = require("path");
const app = express();
const sequelize = require("sequelize");
const db = require("./models");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.listen(3001, (req, res) => {
//   require("./bootfiles/routes")(app);
//   console.log("listening on port 3000");
// });

// for future storage using aws and pg
db.sequelize.sync().then(() => {
  app.listen(3001, (req, res) => {
    console.log("listening on port 3000");
  });

  require("./bootfiles/db")();
  require("./bootfiles/routes")(app);
  app.get("/", (req, res) => {
    res.send("welcome to home page");
  });
});
