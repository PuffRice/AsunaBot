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
  
const voiceCon = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
		if(voiceCon == null) {
			message.channel.send('I left already !!')                   
		} else {

			message.channel.send('Ok, I\'m leaving :pensive: Later :wave:')
voiceCon.disconnect().catch(err => {
				return giveErr(err)
			})
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
  aliases: ["disconnect", "goaway"],
  permLevel: "User"
};

exports.help = {
  name: "leave",
  category: "Music",
  description: "Make me leave the voice channel if you've no work left for me",
  usage: "leave"
};
