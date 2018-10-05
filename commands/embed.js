exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require('discord.js');
 let bot = client

       const text = args.slice(1).join(' ')
      const embed = new Discord.RichEmbed()
      .setColor(args[0])
      .setDescription(text)
      .setFooter(`Embed by ${message.author.tag}`);
       message.channel.send(embed); 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "embed",
  category: "Miscelaneous",
  description: "Make an embed by setting the color and description",
  usage: "embed #fdb900 Presents to you"
};
