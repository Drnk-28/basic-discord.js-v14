const Bot = require("./bot-handler.js")

const client = new Bot()
client.connect()

module.exports = client
