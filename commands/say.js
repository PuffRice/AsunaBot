exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
let msg = args.join(" ")
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
  name: "say",
  category: "Miscelaneous",
  description: "Makes me say whatever you want.....***Whatever***",
  usage: "say Ahoy There"
};
