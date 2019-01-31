/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
let speechOutput;
 let reprompt;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
   attributes['activeLetter']='0';
   // this.sessionAttributes['usedCountry']=[];
	let welcomeOutput = "Welcome to the Informative game of Atlas. Lets test your knowledge about country. let me brief you about the rules, we will take turns naming a country which start with the last letter of the previous country. start the game by saying any country of your choice.";
	let welcomeReprompt = "start the game by saying any country of your choice.";

    return handlerInput.responseBuilder
      .speak(welcomeOutput)
      .reprompt(welcomeReprompt)
      .getResponse();
  },
};

const currentLetterIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'currentLetter';
  },
  handle(handlerInput) {
     // let currentLetter=this.attributes['activeLetter']
     let currentLetter='a'
     if(currentLetter=='0'){
      speechOutput = 'we have to start the game start by saying any country of your choice'
      reprompt = 'You can start by saying any country of your choice'; 
     }else{
      speechOutput = 'You have to tell me a country with letter '+currentLetter;
      reprompt = 'Tell me a name of a country starting with '+currentLetter; 
     }
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withSimpleCard('Current letter', speechOutput)
      .getResponse();
  },
};

const restartGameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'restartGame';
  },
  handle(handlerInput) {
     // this.attributes['activeLetter']='0';
     // this.attributes['usedCountry']=[];
     speechOutput = 'start the game by telling me the name of any country';
     reprompt = 'start the game by saying any country of your choice.';
     
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    restartGameIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
