const { Events , ActivityType} = require("discord.js")

module.exports = {
  name: Events.ClientReady,
  once: true, // Boolean 
  execute: async (client) => {
    setInterval(async () => {
      const promises = [
        client.cluster.broadcastEval(c => c.guilds.cache.size),
        client.cluster.broadcastEval((c) => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ]

      const results = await Promise.all(promises);

      const servers = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
      const members = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

      const status = [
        { type: ActivityType.Playing, name: `/help | ${client.prefix}help` },
        { type: ActivityType.Watching, name: ` ${members} Users` },
        { type: ActivityType.Competing, name: ` ${servers} Guilds` },
        // delete the activity below, but don't forget to give me a star, hahaha
        { type: ActivityType.Watching, name: `don't forget to give me a star` },
        { type: ActivityType.Watching, name: `github.com/FuadJTM/basic-discord.js-v14` }
        ];

      const index = Math.floor(Math.random() * status.length);

      await client.user.setActivity(status[index].name, { type: status[index].type });
    }, 5000);

    console.log(`[ CLIENT INFO ] ${client.user.username} is ready with ${client.guilds.cache.size} server`)

  }
}
