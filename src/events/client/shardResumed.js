const { Events } = require("discord.js")
module.exports = {
  name: Events.ShardResume,
  execute: async (error, id, client) => {
    console.log(`[WARN] Shard ${id} Shard Resumed!`)
  }
}