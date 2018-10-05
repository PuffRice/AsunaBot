exports.run = (client, message, args, level) => {
  const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { YTSearcher } = require('ytsearcher'); 
const fs = require('fs'); 
const playlist = require('youtube-playlist-info');
const ytkey = "AIzaSyBBq6-Zbsq6V3PLsXCb7NCdS2TKgOoMAXQ"
const searcher = new YTSearcher({ // For searching.
	key: ytkey,
	revealkey: true
})
let queuesL = {};
let loop = {};
  	function getQueueLink(server) { // Grabbed from DarkoPendragon's Music module (v1.5.1), edited to fit a queue link.
		if (!queuesL[server]) queuesL[server] = [];
		return queuesL[server];
	}
  
	  		let	dispatcher = message.guild.voiceConnection;
        let volumeEmoji = ":sound:";
				const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
    if (!args[0]) { message.channel.send(` The Volume is **${voiceConnection.dispatcher.volume * 100}**% ${volumeEmoji}`)};
	 	if (voiceConnection == null) return message.channel.send('Sadly not playing Anything!');
   if(isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send(' You have to give a number between 0 - 200 ');
      voiceConnection.dispatcher.setVolume(args[0] / 100);
   if(args[0] > 100 && args[0] < 200) return message.channel.send(`Hai! Set the volume to **${args[0]}%** :loud_sound:`);
   if(args[0] > 50 && args[0] < 101) return message.channel.send(`Hai! Set the volume to **${args[0]}%** :sound:`);
   if(args[0] > 0 && args[0] < 51) return message.channel.send(`Hai! Set the volume to **${args[0]}%** :speaker:`);
  
    function giveErr(err) {
	let datErrTho = err
	let giveTheErrPls = new Discord.RichEmbed()
	.setColor([179, 0, 0])
	.setTitle(`Error while executing this command!`)
	.setThumbnail(client.user.avatarURL)
	.addField(`Type of error: ${giveTypeOfErr(err)}`, '`' + datErrTho + '`')
	.setFooter(`For more information or info on how to fix this,  go to https://discord.gg/RfmJYQX`)
	return giveTheErrPls
}

function giveTypeOfErr(err) {
	if(err.startsWith('TypeError')) {
		return 'Type'
	} else if(err.startsWith('Error')) {
		return 'Regular'
	} else if(err.startsWith('AssertionError')) {
		return 'Assertion'
	} else if(err.startsWith('EvalError')) {
		return 'Evaluation'
	} else if(err.startsWith('RangeError')) {
		return 'Range'
	} else if(err.startsWith('SyntaxError')) {
		return 'Syntax'
	} else if(err.startsWith('ReferenceError')) {
		return 'Undefined Reference'
	} else if(err.startsWith('URIError')) {
		return 'URI'
	} else {
		return 'Unknown'
	}
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  category: "Music",
  description: "Set Music Volume between 2-200",
  usage: "volume 60"
};