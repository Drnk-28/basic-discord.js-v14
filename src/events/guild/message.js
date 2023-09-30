const const { Events, Collection } = require("discord.js")

module.exports = {
  name: Events.MessageCreate,
  execute: async (message, client) => {

    let { guild, author } = message
    if (!guild || author.bot) return

    let prefix = ""
    let prefixArray = [client.prefix, ">", /*"data.prefix"*/ ] // for custom prefixes if you use a database

    prefixArray.forEach((p) => {
      if (message.content.toLowerCase().startsWith(p)) {
        prefix = p
      }
    })

    if (!prefix) return
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

    let command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(cmd))
    if (!command) return


    if (command.developer === true) {
      if (!client.dev.includes(author.id) && author.id !== client.owner) {
        return message.reply({ content: ":x: | sorry, this command is only for our developers." })
      }
    }

    if (command.owner === true) {
      if (author.id !== client.owner) return message.reply({ content: ":x: | sorry, this command is only for bot owner" })
    }

    if (command.permission && !client.dev.includes(author.id)) {
      let authPerms = message.channel.permissionsFor(author)
      if (!authPerms.has(command.permission)) {
        return message.reply({ content: ":x: | Sorry, you don't have access to use this command." })
      }
    }

    const { cooldowns } = client
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection())
    }

    let now = Date.now()
    let timestamp = cooldowns.get(command.name)
    let cdAmount = (command.cooldown || 5) * 1000

    if (timestamp.has(author.id)) {
      const expiredTime = timestamp.get(author.id) + cdAmount
      if (now < expiredTime) {
        let timeleft = (expiredTime - now) / 1000
        let msg = `Please wait **\`${timeleft.toFixed(1)} more second(s)\`**,\nbefore using **\`${command.name}\`** command`
        return message.reply({ content: msg })
      }
    }
    if (!client.dev.includes(author.id)) {
      timestamp.set(author.id, now)
    }
    setTimeout(() => {
      timestamp.delete(author.id)
    }, cdAmount)
    
    try {
      
      command.run(client, message, args)
      
    } catch (e) {
      console.log(e)
      return message.reply({content: ":x: | hi, an unexplained error has occurred here, please try again in a moment!"})
    }
    
  }
}
