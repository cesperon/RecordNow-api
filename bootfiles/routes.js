const cors = require("cors");
const express = require("express");
const apiRoutes = require("../routes/api.js");

module.exports = (app) => {
  // middleware
  app.use(
    cors({
      // origin: ["http://localhost:5500", "http://localhost"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Api Routes
  app.use(apiRoutes);
};
