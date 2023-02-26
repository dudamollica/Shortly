import joi from "joi"

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
})

export const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})