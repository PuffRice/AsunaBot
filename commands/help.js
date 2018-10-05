/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

exports.run = (client, message, args, level) => {
  const Discord = require('discord.js')
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = ` Command List \n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `=\u200b\n${cat} =\n`;
        currentCategory = cat;
      }
      output += `\`${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}\` : ${c.help.description}\n`;
    });
    let helpmsg = output.split('=')
    let finalmsg = helpmsg.slice(1)
    const embed = new Discord.RichEmbed()
  	.setColor([255, 165, 0])
		.setThumbnail(client.user.avatarURL)
    .setAuthor(`Command list`, client.user.avatarURL)
    .setDescription(`[Use ${message.settings.prefix}help <commandname> for details]`)
    .addField(finalmsg[0], finalmsg[1])
    .addField(finalmsg[2], finalmsg[3])
    .addField(finalmsg[4], finalmsg[5])
    .addField(finalmsg[6], finalmsg[7])
    .addField(`Useful Links (Trust Me)`, `[Invite Me](https://discordapp.com/oauth2/authorize?&client_id=477816688910401536&scope=bot&permissions=8), [SupportServer]`)
    message.channel.send(embed /*{code: "asciidoc", split: { char: "\u200b" }}*/);
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      const embed = new Discord.RichEmbed()
      .setColor("#fdb900")
      .setTitle(message.settings.prefix + command.help.name)
      .setThumbnail(client.user.avatarURL)
      .setDescription(command.help.description)
      .addField(`Aliases`, command.conf.aliases.join(', '))
      .addField(`Usage`, `${message.settings.prefix}${command.help.usage}`)
      message.channel.send(embed)
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "Info",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
