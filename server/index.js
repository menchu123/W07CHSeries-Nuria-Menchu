const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("series:server");
const cors = require("cors");

const app = express();
app.use(cors());

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`connecting to ${port}`));
      resolve(server);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error to initialize Server"));
      if (error.code === "EADDRIUNSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }
      // reject();
    });

    server.on("close", () => {
      debug(chalk.blue("See you soon"));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

module.exports = { initializeServer };
