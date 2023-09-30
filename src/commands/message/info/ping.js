const { PermissionsBitField } = require("discord.js")
module.exports = {
  name: "ping",
  aliases: ["pong"],
  description: "check the bot's current latency.",
  usage: "{p}{cname}",
  cooldown: 10,
  permission: PermissionsBitField.Flags.SendMessages,
  developer: false,
  owner: false,
  run: async (client, message, args) => {
    
    let ping = Math.round(client.ws.ping)
    return message.channel.send(`bot latency is \`${ping}ms\``)
    
  }
}