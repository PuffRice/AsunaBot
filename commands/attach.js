
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require('discord.js');

 
      const { Attachment } = require('discord.js');
       const attachment = new Attachment(args[0])
       message.channel.send(attachment)
       
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "attach",
  category: "Miscelaneous",
  description: "Make the bot attach any image",
  usage: "attach http://imgur.com/3hdc8eb"
};
