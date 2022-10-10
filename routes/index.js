const express = require('express');
const router = express.Router();

const noticeRouter = require('./notice.router');
const applyRouter = require('./apply.router');

//server health check
router.get('/ping', (req, res) => {
  console.log('pong');
  res.json('pong');
});

//채용공고 관련 라우터
router.use('/notice', noticeRouter);

//회원 채용공고 지원 관련 라우터
router.use('/apply', applyRouter);

module.exports = router;
