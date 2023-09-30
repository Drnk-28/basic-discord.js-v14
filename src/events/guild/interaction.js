const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  execute: async (interaction, client) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = client.slashCommands.get(interaction.commandName)
      if(interaction.user.bot) return
      if(!command) return;
      
      if (command.developer === true && interaction.user.id !== client.owner) {
        if (!client.dev.includes(interaction.user.id)) {
          return interaction.reply({ content: ":x: | sorry, this command is only for our developers.", ephemeral: true })
        }
      }
      
      try {
        command.run(client, interaction)
      } catch (e) {
        console.log(e)
        return interaction.reply({content: ":x: | Sorry, an error has occurred that you don't understand here, please try again in a moment", ephemeral: true})
      }
      
    }
  }
}