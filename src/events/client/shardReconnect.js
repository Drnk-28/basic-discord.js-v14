const { Events } = require("discord.js")
module.exports = {
  name: Events.ShardReconnecting,
  execute: async (error, id, client) => {
    console.log(`[WARN] Shard ${id} Shard Reconnected!`);
  }
}