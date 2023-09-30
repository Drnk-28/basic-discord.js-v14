const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const { config, color } = require("./settings/config")

class BotHandler extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
      ],
      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
      ],
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      }
    })
    
    this.cooldowns = new Collection()
    this.commands = new Collection()
    this.config = config
    this.slashCommands = new Collection()
    this.dev = this.config.DEVELOPER
    this.owner = this.config.OWNER
    this.prefix = this.config.DEFAULT_PREFIX
    this.cluster = new ClusterClient(this)
    this.token = this.config.BOT_TOKEN
    this.color = color
    let handler = ["index", "function"]
    
    handler.forEach((file) => {
      require(`./handler/${file}.js`)(this)
    })
    
  }
  connect() {
    return super.login(this.token)
  }
}

module.exports = BotHandler