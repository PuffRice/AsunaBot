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
  	function grabLoop(server, type) {
		if (!loop[server]) {
		loop[server] = {
			type: 0
		}
    }
			if(type) return loop[server] = {
				type: type
      }
      return loop[server];
	}
  
const argus = message.content.toLowerCase().split(' ').slice(1)
	const loopah = grabLoop(message.guild.id)
	if(!argus) {
		message.channel.send('Please define from one of these: `0` or `off`, `1` or `onesong` or `one_song` OR `2` or `all` Pretty Please!!')
	} else if(argus.includes('0')) {
		grabLoop(message.guild.id, 0)
		message.channel.send('Hai! Set to "off"! :x:')
	} else if(argus.includes('off')) {
		grabLoop(message.guild.id, 0)
		message.channel.send('Hai! Set to "off"! :x:')
	} else if(argus.includes('1')) {
		grabLoop(message.guild.id, 1)
		message.channel.send('Hai! Set to "One Song"! :repeat_one:')
	} else if(argus.includes('onesong')) {
		grabLoop(message.guild.id, 1)
		message.channel.send('Hai! Set to "One Song"! :repeat_one:')
	} else if(argus.includes('one_song')) {
		grabLoop(message.guild.id, 1)
		message.channel.send('Hai! Set to "One Song"! :repeat_one:')
	} else if(argus.includes('2')) {
		grabLoop(message.guild.id, 2)
		message.channel.send('Hai! Set to "All"! :repeat:')
	} else if(argus.includes('all')) {
		grabLoop(message.guild.id, 2)
		message.channel.send('Hai! Set to "All"! :repeat:')
	} else {
		message.channel.send('Please define from one of these: `0` or `off`, `1` or `onesong` or `one_song` OR `2` or `all`')
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
  aliases: ["repeat"],
  permLevel: "User"
};

exports.help = {
  name: "loop",
  category: "Music",
  description: "loops or repeats one song or many songs or all songs in the queue",
  usage: "loop all/one/1"
};
