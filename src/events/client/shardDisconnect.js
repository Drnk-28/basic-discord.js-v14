const { Events } = require("discord.js")
module.exports = {
  name: Events.ShardDisconnect ,
  execute: async ( error, id, client) => {
    console.log(`[WARN] Shard ${id} Shard Disconnected!`);
  }
}
