var Botkit = require('botkit');
var palindrome = require('./palindrome.js').palindrome;
var key = require('./keys.js').apikey;

var controller = Botkit.slackbot({
  debug: true, 
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

function generateResponse(message){

  if(palindrome(message.text)){
    return message.text + ' is a palindrome';
  }else{
    return message.text + ' is not a palindrome';
  }

}

// reply to a direct mention - @bot hello
controller.on(['direct_mention','direct_message'],function(bot,message) {
  
  var response = generateResponse(message); 
  bot.reply(message,response);

});


// connect the bot to a stream of messages
controller.spawn({
  token: key,
}).startRTM()

