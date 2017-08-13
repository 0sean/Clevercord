// Clevercord by Anidox - A Cleverbot for Discord.
// github.com/theanidox/Clevercord
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
// Cleverbot-node
var Cleverbot = require("cleverbot-node");
var clever = new Cleverbot;
// Logging
const log = require("fancy-log");
const ch = require("chalk");
// Settings
const settings = require("./settings.json")
clever.configure({botapi: `${settings.apikey}`});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
client.on("ready", () => {
  client.user.setGame(settings.game);
  client.user.setStatus(settings.status);
  log.info(ch.bold.underline.bgBlue("Clevercord by Anidox, loaded and ready!"));
  log.info(ch.bold.underline.bgBlue(`I'm logged in as ${client.user.username}#${client.user.discriminator} and I'm in ${client.guilds.size} guild(s).`));
  log.info(ch.bold.underline.bgBlue(`Talk to me by starting your message with ${settings.prefix}`));
});
client.on("message", (message) => {
  if (message.content.startsWith(settings.prefix)) {
    // Define our question
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    message.react("🗣");
    // Asks Cleverbot the question
    clever.write(message.content, (clcontent) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send({embed: {
          color: 3447003,
          title: '🗣 Cleverbot says...',
          description: clcontent.output
        }}).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
  });
}
});

//logs in ofc
client.login(settings.token)
