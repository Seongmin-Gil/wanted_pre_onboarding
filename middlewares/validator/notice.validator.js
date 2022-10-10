const Joi = require('joi');
const CustomError = require('../../utils/CustomError');

const postNoticeSchema = Joi.object({
  body: Joi.object({
    companyId: Joi.string().uuid().required(),
    position: Joi.string().required(),
    reward: Joi.number().integer().required(),
    content: Joi.string().required(),
    skill: Joi.string().required(),
  }).error(new CustomError(404, 'INVALID_INPUT')),
}).unknown(true);

const putNoticeSchema = Joi.object({
  params: Joi.object({
    noticeId: Joi.string().uuid().required().error(new CustomError(404, 'INVALID_INPUT')),
  }).unknown(true),
  body: Joi.object({
    position: Joi.string().required(),
    reward: Joi.number().integer().required(),
    content: Joi.string().required(),
    skill: Joi.string().required(),
  }).error(new CustomError(404, 'INVALID_INPUT')),
}).unknown(true);

const deleteNoticeSchema = Joi.object({
  params: Joi.object({
    noticeId: Joi.string().uuid().required().error(new CustomError(404, 'INVALID_INPUT')),
  }),
}).unknown(true);

module.exports = {
  postNoticeSchema,
  putNoticeSchema,
  deleteNoticeSchema,
};
