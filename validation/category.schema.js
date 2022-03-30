const joi= require("@hapi/joi")
const categorySchema = joi.object({
    name: joi.string().required()
})

module.exports = {
    categorySchema,
}