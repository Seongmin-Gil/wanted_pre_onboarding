const express = require('express');
const router = express.Router();

const noticeRouter = require('./notice.router');
const applyRouter = require('./apply.router');

router.get('/ping', (req, res) => {
  console.log('pong');
  res.json('pong');
});

router.use('/notice', noticeRouter);
router.use('/apply', applyRouter);

module.exports = router;
