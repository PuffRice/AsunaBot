exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const Discord = require('discord.js');
 let bot = client
      let embed
       const text = args.join(' ')
       const magic = text.split(';')
       const fields = magic.slice(4)
     if (fields.length = 1) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0])
      .setFooter(`${magic[3]}`);
     }
   else if (fields.length = 2) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0], fields[1])
      .setFooter(`${magic[3]}`);
     }
 else  if (fields.length = 3) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0], fields[1])
     .addField(fields[2])
      .setFooter(`${magic[3]}`);
     }
  else if (fields.length = 4) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0], fields[1])
     .addField(fields[2], fields[3])
      .setFooter(`${magic[3]}`);
     }
  else if (fields.length = 5) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0], fields[1])
     .addField(fields[2], fields[3])
     .addField(fields[4])
      .setFooter(`${magic[3]}`);
     }
  else if (fields.length = 6) {
       
       embed = new Discord.RichEmbed()
      .setColor(magic[0])
      .setTitle(magic[1])
      .setDescription(magic[2])
      .addField(fields[0], fields[1])
     .addField(fields[2], fields[3])
     .addField(fields[4], fields[5])
      .setFooter(`${magic[3]}`);
     }
       message.channel.send(embed); 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rembed'],
  permLevel: "User"
};

exports.help = {
  name: "richembed",
  category: "Miscelaneous",
  description: "Make an embed by setting the title, color, description, footer, fields(upto 6)",
  usage: "embed [color in hex];[title];[description];[footer];[field name];[field text]....[field text]"
};