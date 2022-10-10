const router = require('express').Router();
const { validator, transaction } = require('../middlewares');
const { postNoticeSchema, putNoticeSchema } = require('../middlewares/validator/notice.validator');

const { postNotice, putNotice } = require('../controllers/notice.controller');

router.route('/').post(validator(postNoticeSchema), postNotice);
router.route('/:noticeId').put(validator(putNoticeSchema), transaction(putNotice));

module.exports = router;
