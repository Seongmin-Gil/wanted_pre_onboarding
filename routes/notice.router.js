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
  /**
   * 채용공고 등록
   * @route POST /notice
   */
  .post(validator(postNoticeSchema), catchAsync(postNotice))
  /**
   * 채용공고 목록 조회
   * @route GET /notice
   */
  .get(catchAsync(getNotice));

router
  .route('/search')
  /**
   * 채용공고 검색
   * @route GET /notice/search?text=
   */
  .get(catchAsync(getSearchNotice));

router
  .route('/:noticeId')
  /**
   * 채용공고 수정
   * @route PUT /notice/:noticeId
   */
  .put(validator(putNoticeSchema), transaction(putNotice))
  /**
   * 채용공고 삭제
   * @route DELETE /notice/:noticeId
   */
  .delete(validator(noticeIdSchema), transaction(deleteNotice))
  /**
   * 채용공고 상세조회
   * @route GET /notice/:noticeId
   */
  .get(validator(noticeIdSchema), catchAsync(getDetailNotice));

module.exports = router;
