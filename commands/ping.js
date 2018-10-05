exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require('discord.js');
 let bot = client

  const msg = await message.channel.send("Ping?");
   const pingReturn = new Discord.RichEmbed()
    .setColor([182, 244, 66])
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
    .setDescription(`Pong🏓`)
    .addField(`Message:`, `${msg.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField(`API:`, `${Math.round(bot.ping)}ms`, true)
  msg.edit(pingReturn);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping"
};
