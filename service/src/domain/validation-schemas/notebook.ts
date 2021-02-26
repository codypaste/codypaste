import Joi from 'joi';

export const notebookValidationSchema = Joi.object({
  title: Joi.string().required(),
  password: Joi.string(),
  expirationDatetime: Joi.date().iso().allow(null),
});
