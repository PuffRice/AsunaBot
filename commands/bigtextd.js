exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
 let final = []
     let msg = []
     message.delete(50)
    for(let g = 0; g<args.length;g++){
      
     let text = args[g]
     let text2 = text.toLowerCase().split("")
    
     for(let i = 0; i<text2.length;i++){
     
       msg[i] = `:regional_indicator_${text2[i]}:`
      
     }
       final[g] = msg.join(" ")
    }
    let supfin = final.join("   ")
    message.channel.send(supfin)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "bigtextd",
  category: "Miscelaneous",
  description: "Makes me say whatever you want.....***Whatever*** in BIG text and then deletes your message so they won't know who sent it",
  usage: "bigtextd"
};
