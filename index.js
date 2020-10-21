const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');
const mongoose = require('mongoose');
const Canvas = require('canvas')
const Mee6LevelsApi = require("mee6-levels-api");
const GuildRank = require('./db');
const reg = /(?:\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c\udffb|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb\udffc]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffd]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69])(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g
let user_xp;
let user_level;
let user_profanity;
const badwords = ["Fuck"]; //Bad words


client.on("ready", () => {
    console.log("I am ready!");
})



client.on('guildMemberAdd', async member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome-channel');

    if (!channel) return;
//Creating a canvas that invites the members
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const r_num = Math.floor((Math.random() * 3) + 1);

    const background = await Canvas.loadImage(`./image/image${r_num}.jpg`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    ctx.font = '22px sans-serif';
    // Select the style that will be used to fill the text in
    ctx.fillStyle = '#ffffff';
    // Actually fill the text with a solid color
    ctx.fillText(member.displayName, canvas.width / 2.65, canvas.height / 1.1);



    ctx.font = '16px sans-serif';
    // Select the style that will be used to fill the text in
    ctx.fillStyle = '#ffffff';
    // Actually fill the text with a solid color
    ctx.fillText('#' + member.user.discriminator, canvas.width / 1.7, canvas.height / 1.1);


    ctx.font = '20px sans-serif';
    // Select the style that will be used to fill the text in
    ctx.fillStyle = '#ffffff';
    // Actually fill the text with a solid color
    ctx.fillText('Member : #' + member.guild.memberCount, canvas.width / 1.3, canvas.height / 6);


    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(350, 125, 70, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();



    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 250, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
    const user = new GuildRank({ id: message.author.id });
    await user.save();


});


client.on('message', async message => {

    let user;

    if (!message.author.bot) { //Checks if the message by the user is in the db


    if (message.content === '!j') {        
        client.emit('guildMemberAdd', message.member); //emits new member.
    }
 



        user = await GuildRank.findOne({ id: message.author.id })

        if (!user) {
            const new_user = new GuildRank({ id: message.author.id })
            await new_user.save();
            user = new_user;
        }

        user_xp =  user.xp;
        user_level =  user.level;
        user_profanity= user.profanityLevel;
   



    if (reg.test(message.content)) { //Testing mass emojis with regex
        
        let count = 0
        let message_arr = message.content.split(' ')

        for (i = 0; i < message_arr.length; i++) {
            if (reg.exec(message.content)) {
                count++;
                if (count > 3) {
                    return message.channel.send(`<@${message.author.id}> has been warned. \n Reason: \`MASS EMOJI\` `);
                }
            }

        }
    }

    if(message.content.startsWith("?about"))
    {
        return message.channel.send("\n NoKursery is a bot that helps your server be wholesome and friendly. The bot provides \n `1. Profanity Filter \n 2.Mass Emoji Detection \n 3. Rankings and Levels \n 4. Comparisons with MEE6 \n 5. Kick/Ban (For Admins) and Welcome Messages ` \n made with MongoDB, DJS and :heart: ");
    }

    if (message.content.toLowerCase().startsWith("!rank")) {


        return getRankinCanvas(message,user_xp)
        
    }


    if (message.content.toLowerCase().startsWith("!compare")) {


        const guildId = "766025778114199612";
        const userId = message.author.id;
        const user_mee6_info = await Mee6LevelsApi.getUserXp(guildId, userId);
        const user_rank = await GuildRank.find({ xp: { $gt: user_xp } }).count();


        message.channel.send
            (` \`\`\`
        
                NoKursery   MEE6 
    *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
        
    Rank    |      #${user_rank + 1}         #${user_mee6_info.rank}
        
    Level   |       ${user_level}          ${user_mee6_info.level}
        

    \`\`\` `);
    }

    if(message.content.startsWith("!kick") && message.member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS']))
    {
        let member = message.mentions.members.first()
        member.kick().then(member => {message.channel.send("Kicked " + member.displayName);
    });

    }

    if(message.content.startsWith("!kick") && !message.member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS']))
    {
       return message.channel.send("Lol nice try.");
    }

    const msgLen = message.content.split(" ").length;
    const XP = msgLen * Math.floor((Math.random() * 12) + 1);

    if (badWordFilter(message)) {
        await changeProfanity(message,user_profanity)
        await changeXP(message, -XP, user_xp,user_level);

    }
    
    else
        {
            changeXP(message, XP, user_xp,user_level)
        }
        


    }; 
 });


     function badWordFilter(message) {
        for (i = 0; i < badwords.length; i++) {

            if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) {
               message.delete({ timeout: 1500 }).then(message.channel.send(`Hey <@${message.author.id}>, that was not cool! :angry:`));
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    async function getRankinCanvas(message,xp) {


        const rank = await GuildRank.find({ xp: { $gt: xp } }).count();


        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const r_num = Math.floor((Math.random() * 3) + 1);
        const background = await Canvas.loadImage(`./image/image${r_num}.jpg`);
        
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        if (rank < 10) {

            ctx.font = '110px San Serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText(rank+1, canvas.width / 1.7, canvas.height / 1.5);

        }


        if (rank >= 10 && rank <= 99) {

            ctx.font = '100px San Serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText(rank+1, canvas.width / 1.8, canvas.height / 1.5);

        }

        if (rank > 99 && rank <= 999) {

            ctx.font = '90px San Serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText(rank+1, canvas.width / 1.8, canvas.height / 1.5);

        }

        if (rank > 999 && rank <= 9999) {

            ctx.font = '85px San Serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText(rank+1, canvas.width / 1.9, canvas.height / 1.6);

        }

        if (rank >= 9999 && rank < 50000) {

            ctx.font = '80px San Serif';
            // Select the style that will be used to fill the text in
            ctx.fillStyle = '#ffffff';
            // Actually fill the text with a solid color
            ctx.fillText(rank+1, canvas.width / 2.0, canvas.height / 1.6);

        }

        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        return message.channel.send(`Your rank, ${message.author} is`, attachment);


    }

    async function changeProfanity(message,profanity) {
        await GuildRank.findOneAndUpdate({ id: message.author.id }, { profanityLevel: profanity + 1 })
    }

    async function changeXP(message, XP, old_xp,user_level) {
        let changeXP = old_xp + XP;
        await GuildRank.findOneAndUpdate({id: message.author.id }, { xp: changeXP });
        checkLevel(message,user_level,changeXP);
    }

    async function checkLevel(message,currentLevel, newXP) {
        
        const levelXPcheck = levels(newXP)

        console.log(currentLevel+"is current level")
        console.log(levelXPcheck+" is newLevelXP")

        if (currentLevel == levelXPcheck) {
            return;
        }

        else {
            updateLevel(message, levelXPcheck)
        }

    }

    async function updateLevel(message, new_level) {
        const updater = await GuildRank.findOneAndUpdate({ id: message.author.id }, { level: new_level })
        message.channel.send(`GG <@${message.author.id}>, you just advanced to Level ${new_level}`);
    }

    function levels(xp) {
        if(xp<0)
        {
            return -1;
        }
        if (xp > 0 && xp <= 500) {
            return 0;
        }
        if (xp >= 501 && xp <= 1500) {
            return 1;
        }

        if (xp >= 1501 && xp <= 3500) {
            return 2;
        }

        if (xp >= 3501 && x <= 6000) {
            return 3
        }

        if (xp >= 6001 && xp <= 10000) {
            return 4;
        }

        if (xp >= 10001 && xp <= 15000) {
            return 5;
        }

        if (xp >= 15001 && xp <= 20000) {
            return 6;
        }

    }


    mongoose.connect('mongodb+srv://sparsh_joshi:sparsh@cluster0.dz7ja.mongodb.net/discord?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false
    }).then(
        client.login(token)
    )

