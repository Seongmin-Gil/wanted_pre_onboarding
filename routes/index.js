const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  console.log("pong");
  res.json("pong");
});

module.exports = router;
