exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
let msg = args.join(" ")
message.delete(50)
if(!args) return message.channel.send("Please tell me senpai what I should say")
message.channel.send(msg)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "sayd",
  category: "Miscelaneous",
  description: "Makes me say whatever you want.....***Whatever*** and then deletes your message so they won't know:wink:",
  usage: "sayd Ahoy There Senpai"
};
