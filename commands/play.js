exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
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
	function getQueueLink(server) { // Grabbed from DarkoPendragon's Music module (v1.5.1), edited to fit a queue link.
		if (!queuesL[server]) queuesL[server] = [];
		return queuesL[server];
	}
  
if(!args) return message.channel.send('No arguments defined!')
		const httpTypes = ['http://', 'https://']
			if(httpTypes.some(ht => args[0].includes(ht))) {
				if(!args[0].includes('youtube.com')) return message.channel.send(`Hmph, This definitely isn't a YT link. Sadly I still can't play from other sources`)
				const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)
				const queul = getQueueLink(message.guild.id)
				ytdl.getInfo(args[0], (err, info) => { 
				queul.push({
					url: args[0],
					title: info.title,
					creator: info.author.name,
					requester: message.author.tag,
					thumbnail: info.thumbnail_url,
					creator_url: info.channel_url
				})
				
					const embed = new Discord.RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(info.thumbnail_url)
		.addField(`:thumbsup:Successfully Added to the Army of the Chosen Tracks:\n\n\n`, `[${info.title}](${args}) \nby [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Added by ${message.author.tag}! not me`)
		message.channel.send(embed)
		if (queul.length === 0 || !client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)) execQueueLink(message, queul);
				})
			} else {
				const queul = getQueueLink(message.guild.id)
				if(!args) return message.channel.send('No arguments!')
				searcher.search(args.join(" "), { type: 'video' }).then(searchResult => {
          if (!searchResult.totalResults || searchResult.totalResults === 0) return message.channel.send('Sorry, But I failed to get search results.:disappointed:')
		  const result = searchResult.first
			ytdl.getInfo(result.url, (err, info) => {
				queul.push({
					url: result.url,
					title: info.title,
					creator: info.author.name,
					requester: message.author.tag,
					thumbnail: result.thumbnails.high.url,
					creator_url: info.author.channel_url
				})
				const embed = new Discord.RichEmbed()
		.setColor([0, 255, 0])
		.setThumbnail(result.thumbnails.high.url)
		.addField(`:thumbsup: Successfully added to the Army of the Chosen Tracks:\n\n\n`,`[${info.title}](${result.url}) \nby  [${info.author.name}](${info.author.channel_url})`)
		.setFooter(`Added by ${message.author.tag}! not me`)
		message.channel.send(embed).catch(err => {
				return giveErr(err)
			})
		if (queul.length === 0 || !client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)) execQueueLink(message, queul);
			})
        }).catch(err => {
				return giveErr(err)
			})
			}
		
  	function execQueueLink(message, queul) { // Execute the queue
		if (queul.length < 0) {
			message.channel.send('The journey of Great Music ends. Play later!:smiley:');
			// Leave the voice channel.
			const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
			if (voiceConnection !== null) return voiceConnection.disconnect();
		}
		new Promise((resolve, reject) => {
		const voiceConnection = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id)
      if (voiceConnection == null) {
        if (message.member.voiceChannel && message.member.voiceChannel.joinable) {
          message.member.voiceChannel.join().then(connection => {
            resolve(connection);
          }).catch((error) => {
            console.error(error);
          });
        } else if (!message.member.voiceChannel.joinable) {
          message.channel.send('It\'s sad that I don\'t have permission to join you!:disappointed:')
          reject();
        } else {
          queul.splice(0, queul.length);
          reject();
        }
      } else {
        resolve(voiceConnection);
      }
    }).then(connection => {
		try {
		const embed = new Discord.RichEmbed()
		.setColor([0, 176, 244])
		.setThumbnail(queul[0].thumbnail)
		.addField(`:notes: **Started Playing:**`, `\n\n\n[${queul[0].title}](${queul[0].url}) \nby\n\n [${queul[0].creator}](${queul[0].creator_url})`)
		.setFooter(`Started by ${queul[0].requester}! not me`)
		message.channel.send(embed)
		} catch (err) {
			return giveErr(err)
		}
		let dispatcher = connection.playStream(ytdl(queul[0].url, {filter: 'audioonly'}))
		connection.on('error', error => {
			message.channel.send(`Dispatcher or connection error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('error', error => {
			message.channel.send(`Dispatcher error occured: ${error}`)
			queul.shift()
		})
		
		dispatcher.on('end', () => {
			setTimeout(() => {
				let datLoopTho = grabLoop(message.guild.id)
				let curLoop = datLoopTho.type
				if(queul.length > 1) {
					if(curLoop == 0) {
						queul.shift()
						execQueueLink(message, queul)
					} else if(curLoop == 1) {
						execQueueLink(message, queul)
					} else if(curLoop == 2) {
						queul.push(queul[0])
						queul.shift()
						execQueueLink(message, queul)
					}
				} else {
					if(curLoop == 0) {
						queul.shift()
						message.channel.send('Looks like the army is drained out and the queue is empty. I\'m Leaving....:disappointed:')
						leave(message)
					} else if(curLoop == 1) {
						execQueueLink(message, queul)
					} else if(curLoop == 2) {
						queul.push(queul[0])
						queul.shift()
						execQueueLink(message, queul)
					}
				}
			}, 1000)
		})
	})
	}
  	function leave(message) { // Leave the VC.
		const voiceCon = client.voiceConnections.find(meh => meh.channel.guild.id == message.guild.id);
		if(voiceCon == null) {
			message.channel.send('I left already !!')                   
		} else {

			message.channel.send(':wave: **Ok, I\'m leaving **:pensive:')
voiceCon.disconnect().catch(err => {
				return giveErr(err)
			})
		}
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
  aliases: ['p'],
  permLevel: "User"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play Some Music and chill",
  usage: "play [name of music/ yt link]"
};