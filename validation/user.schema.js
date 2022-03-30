const joi= require("@hapi/joi")
const userSchema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    address: joi.string().required()
})

module.exports = {
    userSchema,
}