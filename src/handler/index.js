const { Events, Routes, REST } = require("discord.js")
const { readdirSync } = require("fs")

module.exports = (client) => {
  
  try {
    
    let slash = [],
    token = client.token || process.env.BOT_TOKEN
    
    const rest = new REST({ version: "10"}).setToken(token)
    
    
    // load file, for slash commands
    readdirSync("./src/commands/slash").forEach(async(dir) => {
      const commands = readdirSync(`./src/commands/slash/${dir}`).filter((p) => p.endsWith(".js"))
      
      for(const file of commands) {
        const command = await require(`../commands/slash/${dir}/${file}`)
        slash.push(command.data.toJSON())
        client.slashCommands.set(command.data.name, command)
      }
    })
    
    // load file from command using prefix.
    readdirSync("./src/commands/message").forEach(async(dir) => {
      const commands = readdirSync(`./src/commands/message/${dir}`).filter((p) => p.endsWith(".js"))
      
      for(const file of commands) {
        const command = await require(`../commands/message/${dir}/${file}`)
        client.commands.set(command.name, command)
      }
    })
    
    // load events
    readdirSync("./src/events").forEach((dir) => {
      const events = readdirSync(`./src/events/${dir}`).filter((y) => y.endsWith(".js"))
      
      for(const file of events) {
        const event = require(`../events/${dir}/${file}`)
        
        if(!event.name) return console.log(`[EVENT ERROR] Path: "${dir}/${file}" `)
        
        if(event.once) {
          client.on(event.name, (...args) => event.execute(...args, client))
        } else {
          client.on(event.name, (...args) => event.execute(...args, client))
        }
        console.log(`[LOAD EVENTS] ${event.name} `)
      }
    })
    
    // register slash commands 
    client.on(Events.ClientReady, async () => {
      try {
        console.log(`Start reload ${slash.length} slash commands`)
        // replace this with "Routes.applicationGuildCommands(clientID, serverID)"
        // if you want only your server to be able to access slash commands 
        let data = await rest.put(Routes.applicationCommands(client.user.id), {
          body: slash
        })
        console.log(`Reload done with ${data.size} application command and ready to run.`)
      } catch (er) {
        console.log(`[REGISTER SLASH ERROR] ${er}`)
      }
    })
    
    
  } catch (e) {
    console.log("[ERROR] :" + e)
  }
}

// yeah done
