exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
if ( !message.channel.permissionsFor( message.member ).hasPermission( "MANAGE_MESSAGES" ) ) 
              return message.channel.send(' Sadly you dont have permission permission to use this command');
                
          
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between **2** and **100** for the number of messages to delete!");
    
 
    const fetched = await message.channel.fetchMessages({limit: deleteCount + 1});
    message.channel.bulkDelete(fetched)
    message.channel.send("I dumped **" + deleteCount + "** messages! Phew").then( message => {
        message.delete(2000)
    })
      .catch(error => message.reply(`Couldn't destroy those messages because of: ${error}`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: "User"
};

exports.help = {
  name: "prune",
  category: "Miscelaneous",
  description: "Delete any number of messages between 2- 100",
  usage: "prune [number_of_messages]"
};