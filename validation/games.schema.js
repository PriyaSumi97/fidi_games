const joi= require("@hapi/joi")
const gameSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    game_url: joi.string().required(),
    min_players_count: joi.required(),
    max_players_count: joi.required(),
    category:joi.required()
})

module.exports = {
    gameSchema,
}
