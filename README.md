# hi, welcome to my repository

The first step you have to do is [download this repository](https://github.com/FuadJTM/basic-discord.js-v14/archive/refs/tags/new.zip), or you can also use it fork,
However, make sure you have installed the latest version of NodeJS, or minimum version `16`
```js
git clone https://github.com/FuadJTM/basic-discord.js-v14.git
```

after that you can start changing files starting from **[`./src/settings/config.js`](https://github.com/FuadJTM/basic-discord.js-v14/blob/288d3b5842cf3fb0c0bbec488e6160afad014eae/src/settings/config.js)**
code example
```js
const config = {
  BOT_TOKEN: process.env.BOT_TOKEN || "bot token here",
  DEFAULT_PREFIX: process.env.DEFAULT_PREFIX || "!",
  DEVELOPER: ["626413361185292xxx", "588422194711756xxx", "your discord ID"],
  OWNER: "626413361185292xxx",,
  INVITE: process.env.INVITE || "bot invite url",
  SUPPORT: process.env.SUPPORT || "your official serverURL"
}


const color = {
  normal: "BBDEFB",
  wrong: "FB3A51",
  check: "4BFB8D"
}

module.exports = { config, color }
```
However, for tokens I would suggest you keep them in `.env`
As a human, I hope everything is safe, but there's no harm in being careful :)

```
BOT_TOKEN=
DEFAULT_PREFIX=
INVITE=
SUPPORT=
```

So what's next?
next you just need to type `node .` on your terminal, and the bot is ready to use

Yes, below is an image of the help command
## Example `/help`
This is the initial menu you use commands `/help`
![exampleslashhelp](https://cdn.discordapp.com/attachments/1157714561378562149/1157727287798665357/20231001_001355.jpg?ex=6519a90e&is=6518578e&hm=7e9cb1e446d4d8c8c5bb48804b1ad326fb514b682e17602d670cbe19c596a0a0&)


and this is when you have selected the category
![example](https://cdn.discordapp.com/attachments/1157714561378562149/1157727998942916678/20231001_001414.jpg?ex=6519a9b8&is=65185838&hm=45765f6445872bbdf463d984632a9047af997aa8361d4bf557a0a92bba293edf&)


## Example `!help`
This is the initial menu you see after using the `!help` command
![example](https://cdn.discordapp.com/attachments/1157714561378562149/1157729338268065853/20231001_001441.jpg?ex=6519aaf7&is=65185977&hm=5d9a6796320129522f20f64c98bcdc54fe24e2ad9967c9c162b3270e1d78aa12&)


and this is after you use the detail command
![example](https://cdn.discordapp.com/attachments/1157714561378562149/1157729337034944663/20231001_001426.jpg?ex=6519aaf7&is=65185977&hm=70c9a66fddd3d2eede0b066dd18f59636706f42860e3c448dd5b5a58655082e3&)

If you find errors in this repository, you can write your [problem here](https://github.com/FuadJTM/basic-discord.js-v14/issues)

### Finish
hey guys, looks like the bot is active,
but don't forget to press the star button above okay?
