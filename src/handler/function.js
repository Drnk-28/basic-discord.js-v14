module.exports = (client) => {
  // Use this file to make it easier for you to create commands.
  
  // for commands that use prefixes
  client.getMember = (msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.find(m => m.user.id === args)
    if(!member) member = msg.member
    
    let name = member.user.globalName ? member.user.globalName : member.user.username
    let id = member.user.id
    
    // example of use 
    // let { name, id, member } = client.getMember(message, args)
    
    return { member, name, id } 
  }
  
  // global users 
  client.fetchUsers = async (id) => {
    let user = await client.users.fetch(id)
    if(!user) throw new Error("invalid ID")
    
    return user
  }
  
  client.filterMember = (message) => {
    let { guild } = message
    let member = guild.members.cache.filter((p) => !p.user.bot) // human only
    let bot = guild.members.cache.filter((b) => b.user.bot) // bot only
    let all = guild.memberCount // total member 
    
    
    return { all, bot, member }
  }
  
  // just variations
  client.capitalize = (text) => {
    let words = text.split(" ")
    
    for(let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1)
    }
    
    return words.join(" ")
  }
  
  
}

// yeahh done 