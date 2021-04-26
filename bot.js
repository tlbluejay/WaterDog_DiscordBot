// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const cheerio = require('cheerio');
const request = require('request');

const PREFIX = '$shark'
const HELP = '$help'

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.substring(0, PREFIX.length).toLowerCase().includes(PREFIX)) {

    var cnt = msg.content.substring(PREFIX.length);

    if (cnt.toLowerCase().includes('shark')) { 

      var cntSplit = cnt.split(" ");
      var cntWithPluses = cntSplit.join("+");

      var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + cntWithPluses,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
      };
        request(options, function(error, response, responseBody) {
          if (error) {
              return;
          }
    
          $ = cheerio.load(responseBody);
    
    
          var links = $(".image a.link");
    
          var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
         
          console.log(urls);
    
          if (!urls.length) {
             
              msg.reply('Im sorry, but i couldnt swim long enough to find another shark buddy. Try rewording your request!');
              return;
          }
    
          // Send result
          var randurl = urls[Math.floor(Math.random() * urls.length)];
          console.log(randurl);
          const embed = new Discord.MessageEmbed().setColor('#0066cc').setTitle('One Water Dog swimmin on in!').setImage(randurl).setFooter((Math.floor(Math.random() * 10) % 2 == 0 ? 'SHARK BAIT HOOHAHA!!' : 'Fish are friends, not food!'));
          msg.reply(embed);
        });

    } else if (cnt.toLowerCase().includes('03/24')) {
      let cuteMsgThing = 'If you are reading this then that means that i have fully deployed my water dog bot, '
      + 'the following message is meant for my lil Lovebug: Kayla (henceforth known by any of her various nicknames' 
      + ' i have for her).\n\nBaby, by the time you read this or experience this bot in any way we will have just passed our 1 year anniversary.' 
      + ' One whole year of ups and downs, of amazing adventures, of smiles and laughter. A year that has been full of memories that i am exceptionally fond of.'
      + 'This past year has been the most exciting, loving, and enjoyable time of my life. I couldnt have asked for a better partner to spend it with.'
      + 'You are everything i have ever wanted, everything i could have ever asked for, everything i need in life. You are, in my eyes, quintessentially perfect.'
      + 'I want to spend the rest of forever with you, i love you with every fiber of my being. I love you so much Kayla, i cant wait to spend even more years with you. And someday im gonna make you my wife :heart:';
      msg.channel.send("@Cap'n Kaloo#6528 " + cuteMsgThing, {files: ['./images/bright.png']});

    }
    // else if (cnt.toLowerCase().includes('water dog') || cnt.toLowerCase().includes('waterdog')){
    //   msg.reply({files: ['./images/waterdog.png']});
    // }
    // else if (cnt.toLowerCase().includes('chonky dog')){
    //   msg.reply({files: ['./images/chonkyDog.png']});
    // }
  }
  else if (msg.content.substring(0, HELP.length).toLowerCase().includes(HELP)){
    msg.reply('All of my commands MUST have the prefix $shark for me to understand what you want me to do.'
    + '\n--$shark [word/phrase]: You enter any word or phrase that includes the word "shark" and i will randomly select an image from google of that shark.'
    + ' (Please bear with me if my results are inaccurate)\n--$help: I will help you understand how to use my commands'
    + ' so that i may assist your needs for moar Water Dogs!\n--$shark 03/24: A cute lil message meant for Baby');
    //\n--$shark waterdog/water dog: I will give you an image of a water dog that was drawn by my developer' + '\n--$shark chonky dog: I will give you an image of a chonky water dog that was drawn by my developer
  }
});

client.login(process.env.DISCORD_TOKEN);