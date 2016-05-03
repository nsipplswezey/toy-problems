var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var key = require('./keys.js').apikey;

//var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(key, {logLevel: 'debug'});

function palindrome(str){
  var len = str.length;
  var finish = Math.floor(len/2);
  var back, front, match;
  var result = true;

  for(var i = 0; i < finish; i++){
    front = str[i];
    back = str[len - i - 1];
    match = (front === back)
    if(!match){
      result = false;
      return result;
    }
  }

  return result;

}

function generateResultText(text, result){
  if(result){
    resultMessage = text + " is a palindome.";
  } else {
    resultMessage = text + " is not a palindrome.";
  }

  return resultMessage;

}

function handleMentions(message){
  var messageText = message.text;
  var messageChannel = message.channel;
  var resultMessage;

  //Brittle: depends on consistent name for bot
  //Bot name is not static. So the regex match has to be set to the bot name
  var re = /<@U0LELJ13N>.*$/
  var match = messageText.match(re);
  var text = match ? match[0].slice(13) : null;
 
  if(match){

    var testResult = palindrome(text);
    var resultMessage = generateResultText(text,testResult);

    rtm.sendMessage(resultMessage, messageChannel, function messageSent() {
    });

  }

}

function handleDM(message){
  var messageText = message.text;
  //var dmChannel = 'D15FZ5C03';
  var dmChannel = message.channel;
  var testResult = palindrome(messageText);
  var resultMessage = generateResultText(messageText,testResult);

  rtm.sendMessage(resultMessage, dmChannel);

}

function handleResponse(message){
  if (message.channel === 'G15H0F79Q' ){
    handleMentions(message);
  } else if (message.channel[0] === 'D') {
    handleDM(message);
  }

}



rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});


rtm.on(RTM_EVENTS.MESSAGE, handleResponse );


rtm.start();

