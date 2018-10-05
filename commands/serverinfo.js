exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  const Discord = require('discord.js')
//  let emojisize = message.guilds.emojis.size
 // let emojis = message.guild.emojis.array().join()
 /// if(!message.guild.emojis){
 // let emojisize = "0"
 //  let emojis = "none"
 // }
  const users = message.guild.members.filter(member => !member.user.bot).size;
  const bots = message.guild.members.filter(member => member.user.bot).size;
  const textc = message.guild.channels.filter(channel => channel.type == "text").size
  const voicec = message.guild.channels.filter(channel => channel.type == "voice").size
   console.log(message.guild.emojis.array().join(' '))
 const srvrembed = new Discord.RichEmbed()
 .setColor("#00DFAC")
 .setAuthor(`Server Info`, client.user.avatarURL)
 .setTitle(message.guild.name)
 .setThumbnail(message.guild.iconURL)
 .addField(`Server Owner`,`${message.guild.owner.user.tag} (${message.guild.ownerID})`)
 .addField(`Members`,message.guild.memberCount)
 .addField(`User Count`,users)
 .addField(`Bots`,bots)
 .addField(`Server Region`,message.guild.region.toUpperCase())
 .addField(`Created At`, message.guild.createdAt)
 .addField(`Text Channels`, textc)
 .addField(`Voice Channels`, voicec)
 //.addField(`Roles(${message.guild.roles.size})`, message.guild.roles.array().join(', '))
// .addField(`Server Emojis(${message.guilds.emojis.size})`,message.guild.emojis.array().join())
 message.channel.send(srvrembed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sinfo"],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Info",
  description: "Get some information about the server",
  usage: "sinfo"
};
