const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const path = require("path");

app.use(express.json());

const users = require("./routes/user");
const regions = require("./routes/regions");

app.use("/api/v1", users);

app.use("/api/v1", regions);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

module.exports = app;
