const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./api/index");

const app = express();

const port = 8080;
const mongoDB = "mongodb://127.0.0.1:27017/nasa";

app.use(express.json());
app.use("/", apiRouter);

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening at http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(error));
