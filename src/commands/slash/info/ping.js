const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("check the bot's current latency."),
  run: async (client, interaction) => {
    await interaction.deferReply({ephemeral: false})
    
    let ping = Math.round(client.ws.ping)
    
   return await interaction.editReply({content: `Bot latency is: \`${ping}ms\``})
  }
}