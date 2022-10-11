const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { protectedApi, verifyJwt } = require("./middleWare/ProtectedMiddleware");
require("dotenv").config();
const router = require("./api/router");
const userRouter = require("./users/users-router");
const authRouter = require("./users/auth-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// server.use(verifyJwt);
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/projects", router);

server.get("/", (req, res) => {
  res.send("hello from index route");
});

// server.get("/protected", protectedApi, async (req, res) => {
//   res.send(userinfo);
// });

// server.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// server.use((error, req, res, next) => {
//   const status = error.status || 500;
//   const message = error.message || "Internal server error";
//   res.status().send();
// });

module.exports = server;
