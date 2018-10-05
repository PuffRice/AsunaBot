exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
 let final = []
     let msg = []
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
  aliases: ["bt"],
  permLevel: "User"
};

exports.help = {
  name: "bigtext",
  category: "Miscelaneous",
  description: "Makes me say whatever you want.....***Whatever*** in BIG text",
  usage: "bigtext Hola Amigos"
};
