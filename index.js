const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const apiRouter = require("./api/index");

require("./api/socket");

const app = express();
const port = 8080;
const mongoDB = "mongodb://jysim.ddns.net:27017/nasa";

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", apiRouter);
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening at http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(error));
