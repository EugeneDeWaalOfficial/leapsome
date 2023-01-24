// Environment Variables
require("dotenv").config();

// Logger
const logger = require("./core/logger");

// DB & Models
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    logger.error("mongoose.connect error: ", error);
    process.exit(-1);
  });

mongoose.connection.on("error", (err) => {
  logger.error("mongoose.connection.onerror: ", err);
});

// App
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(helmet());
app.use(
  morgan("short", {
    stream: {
      write: (msg) => logger.verbose(msg.trim()),
    },
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "www/dist")));

app.use("/api", require("./api"));

// Error handler
//eslint-disable-next-line no-unused-vars
app.use((err, _, res, next) => {
  if (!err) {
    logger.error("Undefined error");
    res.status(500).end();
    return;
  }

  logger.error(err.message, { stack: err.stack });
  res.status(err.status || 500).end();
});

// Ignite!
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on http://localhost:${port} ...`);
});
