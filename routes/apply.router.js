const router = require('express').Router();
const { validator, transaction } = require('../middlewares');

const { postApplySchema } = require('../middlewares/validator/apply.validator');

const { postApply } = require('../controllers/apply.controller');

router.route('/').post(validator(postApplySchema), transaction(postApply));

module.exports = router;
