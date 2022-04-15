const express = require("express");
const cors = require("cors");
const { protectedApi, verifyJwt } = require("./middleWare/ProtectedMiddleware");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(verifyJwt);

app.get("/", (req, res) => {
  // res.send("hello from index route");
});

app.get("/protected", protectedApi, async (req, res) => {
  res.send(userinfo);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status().send();
});

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
