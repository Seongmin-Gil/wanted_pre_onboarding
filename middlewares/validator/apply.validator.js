const Joi = require('joi');
const CustomError = require('../../utils/CustomError');

const postApplySchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    noticeId: Joi.string().uuid().required(),
  }).error(new CustomError(404, 'INVALID_INPUT')),
}).unknown(true);

module.exports = {
  postApplySchema,
};
