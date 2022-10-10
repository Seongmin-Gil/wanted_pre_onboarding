const router = require('express').Router();
const { validator, transaction } = require('../middlewares');

const { catchAsync } = require('../utils/ErrorHandler');

const {
  postNoticeSchema,
  putNoticeSchema,
  noticeIdSchema,
} = require('../middlewares/validator/notice.validator');

const {
  postNotice,
  putNotice,
  deleteNotice,
  getNotice,
  getDetailNotice,
  getSearchNotice,
} = require('../controllers/notice.controller');

router
  .route('/')
  .post(validator(postNoticeSchema), catchAsync(postNotice))
  .get(catchAsync(getNotice));

router.route('/search').get(catchAsync(getSearchNotice));

router
  .route('/:noticeId')
  .put(validator(putNoticeSchema), transaction(putNotice))
  .delete(validator(noticeIdSchema), transaction(deleteNotice))
  .get(validator(noticeIdSchema), catchAsync(getDetailNotice));

module.exports = router;
