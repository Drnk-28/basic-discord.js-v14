const { Events } = require("discord.js")
module.exports = {
  name: Events.ShardReady,
  execute: async (id, client) => {
    console.log(`[SHARD INFO] Shard ${id} Ready!`);
  }
}
