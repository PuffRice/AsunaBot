const { version } = require("discord.js");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  
  const embed = new Discord.RichEmbed()
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTitle("STATISTICS") 
  .setColor("#fff000")
.addField("• Mem Usage" , `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
.addField("• Uptime"   ,  `${duration}`)
//.addField("• Users"     , `${client.users.size.toLocaleString()}`)
//.addField("• Servers"   , `${client.guilds.size.toLocaleString()}`)
//.addField("• Channels"  , `${client.channels.size.toLocaleString()}`)
.addField("• Discord.js" ,`v${version}`)
.addField("• Node"      , `${process.version}`)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Info",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
