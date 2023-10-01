const { readdirSync } = require("fs")
const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
module.exports = {
  name: "help",
  aliases: ["cmd", "command"],
  description: "here are some of the available bot commands!",
  usage: "{p}{cname} [commandName]",
  cooldown: 10,
  permission: PermissionsBitField.Flags.SendMessages,
  developer: false,
  owner: false,
  run: async (client, message, args) => {
    let disableDir = ["owner", "developer"]
    let cat = []
    let { INVITE, SUPPORT } = client.config
    if(!INVITE.startsWith("https") || !SUPPORT.startsWith("https")) return message.reply({content: ":x: | please update the invite link url, or support url."})
    let member = client.getMember(message, message.author.id)

    readdirSync("./src/commands/message").forEach((dir) => {
      if (disableDir.includes(dir)) return
      let commands = readdirSync(`./src/commands/message/${dir}`)

      let cmds = commands.map((cmd) => {
        let files = require(`../../message/${dir}/${cmd}.js`)
        return files.name || "unknown"
      })

      let obj = new Object()

      obj = {
        name: client.capitalize(dir),
        value: `\`${cmds.join(", ")}\``,
        inline: true
      }

      cat.push(obj)
    })

    let button1 = new ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(ButtonStyle.Link)
      .setURL(INVITE)

    let button2 = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(SUPPORT)

    const row = new ActionRowBuilder()
      .addComponents(button1, button2)

    if (!args[0]) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.capitalize(client.user.username + " help commands"),
          iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 })
        })
        .setDescription(`hi, i am a discord bot, below are my available commands!`)
        .setTitle(`${client.prefix}help [commandName] for more details`)
        .setURL(INVITE)
        .addFields(cat)
        .setColor(client.color.normal)
        .setTimestamp()
        .setFooter({ text: `request from: ${member.name}` })

      return message.channel.send({ embeds: [embed], components: [row] })
    } else {

      let cmd = client.commands.get(args[0]) || client.commands.find((p) => p.aliases && p.aliases.includes(args[0]))
      if (!cmd) return message.reply({ content: `sorry, the ${args[0]} command is not available on my feature` })
      if (cmd.developer === true && !client.dev.includes(message.author.id)) return message.reply({ content: `sorry, the ${args[0]} command is not available on my feature` })
      if (cmd.owner === true && message.author.id !== client.owner) return message.reply({ content: `sorry, the ${args[0]} command is not available on my feature` })

      let name = cmd.name,
        aliases = cmd.aliases ? cmd.aliases.join(", ") : "none",
        desc = cmd.description || "no desc"
        desc = client.capitalize(desc)
        let usage = cmd.usage.replace("{p}", client.prefix).replace("{cname}", name)
        let details = `\`\`\`\nName: ${name}\nAliases: ${aliases}\nDescription: ${desc}\n\nExample: ${usage}\`\`\``
      // here, you can change it, I only prioritize public bots,
      // so for cooldown, developer, owner, permissions, I hide them here!
      const embed = new EmbedBuilder()
        .setAuthor({
          name: client.capitalize(client.user.username + " help commands"),
          iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 })
        })
        .setDescription(`\`\`\`\n <txt> means a txt is required,\n [txt] means txt does not have to be used\`\`\``)
        .setTitle(`Command Details`)
        .setURL(INVITE)
        .setColor(client.color.normal)
        .setTimestamp()
        .setFooter({ text: `request from: ${member.name}` })

      return message.channel.send({ embeds: [embed], components: [row] })

    }


  }
}
