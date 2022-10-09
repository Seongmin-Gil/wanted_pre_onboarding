const express = require("express");
const router = express.Router();

const noticeRouter = require("./notice.router");

router.get("/ping", (req, res) => {
  console.log("pong");
  res.json("pong");
});

router.use("/notice", noticeRouter);

module.exports = router;
