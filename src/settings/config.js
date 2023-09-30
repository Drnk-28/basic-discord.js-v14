const config = {
 // For security reasons, I don't recommend it here, I'm just giving an example
 // You need to install dotenv, then fill in the file, with an example like in "README.md"
  BOT_TOKEN: process.env.BOT_TOKEN || "", // https://discord.com/developers/applications
  DEFAULT_PREFIX: process.env.DEFAULT_PREFIX || "!",// your bot's default prefix
  DEVELOPER: ["626413361185292xxx", "588422194711756xxx", "your discord ID"], // fill in your development team ID
  OWNER: "626413361185292xxx", // the main owner of the bot!,
  INVITE: process.env.INVITE || "https://discord.com/api/oauth2/authorize?client_id=1157688837611470928&permissions=8&scope=bot%20applications.commands",
  SUPPORT: process.env.SUPPORT || ""
}

// custom this? does not matter
const color = {
  normal: "BBDEFB",
  wrong: "FB3A51",
  check: "4BFB8D"
}

module.exports = { config, color }
