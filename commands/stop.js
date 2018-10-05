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
  
		const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
	if (voiceConnection == null) return message.channel.send('Sadly not playing Anything!:frowning:')
		const queul = getQueueLink(message.guild.id)
	queul.splice(0, queul.length)
		const dispatcher = voiceConnection.player.dispatcher;
	if(voiceConnection.paused) {
		try {
		dispatcher.resume()
} catch (err) {
				return giveErr(err)
			}
	}
			try {
			dispatcher.end()
			} catch(err) {
				return giveErr(err)
			}
  
  
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
  aliases: ["shutup"],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop the journey of music and clear the queue",
  usage: "stop"
};