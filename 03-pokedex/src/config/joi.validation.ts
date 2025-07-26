import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.string().required(),
  PORT: Joi.number().default(3004),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DEFAULT_LIMIT: Joi.number().default(10),
});
