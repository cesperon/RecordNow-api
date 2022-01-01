const express = require("express");
const path = require("path");
const app = express();
const sequelize = require("sequelize");
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync().then(() => {
  app.listen(3000, (req, res) => {
    console.log("listening on port 3000");
  });

  require("./bootfiles/db")();
  require("./bootfiles/routes")(app);
  app.get("/", (req, res) => {
    res.send("welcome to home page");
  });
});
