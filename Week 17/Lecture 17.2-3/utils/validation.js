import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(), // the max should be the same as the max in the database
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')) // this is a popular patter in the regexp
    .message('Password must contain at least one uppercase, one lowercase, one number and one special character')
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/) // this is a popular patter in the regexp
    .required()
    .invalid(Joi.ref('currentPassword')) // Alternative to disallow
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, one number and one special character',
      'any.invalid': 'New password cannot be the same as current password'
    })
});