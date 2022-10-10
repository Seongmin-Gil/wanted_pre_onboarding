const router = require('express').Router();
const { validator, transaction } = require('../middlewares');
const {
  postNoticeSchema,
  putNoticeSchema,
  deleteNoticeSchema,
} = require('../middlewares/validator/notice.validator');

const {
  postNotice,
  putNotice,
  deleteNotice,
  getNotice,
} = require('../controllers/notice.controller');

router.route('/').post(validator(postNoticeSchema), postNotice).get(getNotice);
router
  .route('/:noticeId')
  .put(validator(putNoticeSchema), transaction(putNotice))
  .delete(validator(deleteNoticeSchema), transaction(deleteNotice));

module.exports = router;
