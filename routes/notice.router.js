const router = require('express').Router();
const { validator } = require('../middlewares');
const { postNoticeSchema } = require('../middlewares/validator/notice.validator');

const { postNotice } = require('../controllers/notice.controller');

router.route('/').post(validator(postNoticeSchema), postNotice);

module.exports = router;
