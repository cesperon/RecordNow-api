const { Sequelize } = require("sequelize");

module.exports = async () => {
  const url = "mongodb://localhost:27017/okkjii";
  const sequelize = new Sequelize(
    "postgres://postgres:password@localhost:5432/RecordNow"
  ); // Example for postgres
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
