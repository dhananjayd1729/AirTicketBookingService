const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { PORT } = require("../src/config/serverConfig");
const db = require("./models/index");

const apiRoutes = require("./routes/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
