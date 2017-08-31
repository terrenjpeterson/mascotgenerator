**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};


// Questions
var nodes = [{ "node": 1, "message": "Would you rather have a mascot that is more silly than serious?", "yes": 2, "no": 3 },
             { "node": 2, "message": "Do you want a mascot that can fly?", "yes": 4, "no": 7 },
             { "node": 3, "message": "Will this mascot trace it's roots back to the military or other fightingn forces?", "yes": 11, "no": 12 },
             { "node": 4, "message": "Should this be a type of bird?", "yes": 5, "no": 6 },
             { "node": 5, "message": "Is this a large bird?", "yes": 27, "no": 16 },
             { "node": 6, "message": "Should this represent something large?", "yes": 51, "no": 26 },
             { "node": 7, "message": "Is this something that can swim in the water?", "yes": 8, "no": 24 },
             { "node": 8, "message": "Will this be a type of fish?", "yes": 17, "no": 30},
             { "node": 9, "message": "Does it have any hair or fur?", "yes": 35, "no": 36},
             { "node": 10, "message": "Is this something big?", "yes": 19, "no": 18},
             { "node": 11, "message": "Is from ancient times?", "yes": 13, "no": 14},
             { "node": 12, "message": "Is this in honor of a person?", "yes": 15, "no": 25},
             { "node": 13, "message": "Is this an object?", "yes": 20, "no": 21},
             { "node": 14, "message": "Can this item fly?", "yes": 43, "no": 22},
             { "node": 15, "message": "Is this in honor of a female?", "yes": 49, "no": 50},
             { "node": 16, "message": "Is this something not real, like a fantasy creature?", "yes": 37, "no": 38},
             { "node": 17, "message": "Is this a large fish?", "yes": 28, "no": 29},
             { "node": 18, "message": "Is it an insect?", "yes": 33, "no": 34},
             { "node": 19, "message": "Does it live in the mountains?", "yes": 31, "no": 32},
             { "node": 20, "message": "How big is this? Could an individual carry it?", "yes": 39, "no": 41},
             { "node": 21, "message": "Is this something mythical?", "yes": 41, "no": 42},
             { "node": 22, "message": "Is this something found on land?", "yes": 44, "no": 45},
             { "node": 23, "message": "Can this be found on land?", "yes": 46, "no": 47},
             { "node": 24, "message": "Does this have two legs?", "yes": 9, "no": 10},
             { "node": 25, "message": "Is this a weather event?", "yes": 23, "no": 48},
             
// Answers & descriptions
             { "node": 26, "message": "Capable Kites", "yes": 0, "no": 0, "description": "The capable kites can soar to new heights, rising above the competition."},
             { "node": 27, "message": "Outstanding Ostriches", "yes": 0, "no": 0, "description": "These ostriches don't stick their heads in the sand, rather face the challenge in front of them."},
             { "node": 28, "message": "Magnificent Marlins", "yes": 0, "no": 0, "description": "These fish are amazing swimmers, heading up and down the coastline. Their sails and tails glimmer in the sunlight."},
             { "node": 29, "message": "Marvelous Minnows", "yes": 0, "no": 0, "description": "While small, these fish shine in the bright sun, never giving up their energy to swim against the current."},
             { "node": 30, "message": "Dashing Dolphins", "yes": 0, "no": 0, "description": "The fastest mammals of the sea can paddle their way to victory, and even balance a ball on their nose!"},
             { "node": 31, "message": "Capable Coyotes", "yes": 0, "no": 0, "description": "These coyotes can take on any challenge small or large, and even have been known to howl at the moon!"},
             { "node": 32, "message": "Slobbering Dogs", "yes": 0, "no": 0, "description": "Lovable dogs that put in their licks and leave a trail to mark their space."},
             { "node": 33, "message": "Amazing Ants", "yes": 0, "no": 0, "description": "Marching ahead, these small creatures form teams capable of building a mound up to the sky."},
             { "node": 34, "message": "Mighty Mice", "yes": 0, "no": 0, "description": "They might squeek some, but do form strong bonds with one another and celebrate with a little cheese."},
             { "node": 35, "message": "Cheerful Chimpanzees", "yes": 0, "no": 0, "description": "The smartest animals in the jungle like to swing from the trees, and always up for some music."},
             { "node": 36, "message": "Rockin Robots", "yes": 0, "no": 0, "description": "These robots are full of excitement, and ready to blast off into space."},
             { "node": 37, "message": "Fantastic Phoenix", "yes": 0, "no": 0, "description": "Rising from the ashes, the Phoenix comes back time and time again."},
             { "node": 38, "message": "Rockin Robins", "yes": 0, "no": 0, "description": "In the case of these Robins, they not only get the worm, they also get a good time in with their peeps."},
             { "node": 39, "message": "Battle Axe", "yes": 0, "no": 0, "description": "The strong not only survive, but use this mighty tool in battle, thwarting enemies with a single blow."},
             { "node": 40, "message": "Battering Rams", "yes": 0, "no": 0, "description": "Don't get in the way of the Battering Rams. They will knock down any challenge put in front of them."},
             { "node": 41, "message": "Thor's Horsemen", "yes": 0, "no": 0, "description": "Named ofter the Nordic gods, these ride into battle with the fiercest gallop."},
             { "node": 42, "message": "Silent Samuri", "yes": 0, "no": 0, "description": "They come in by night and don't make a sound. The Silent Samuri can approach a challenge from a mountain to the sea."},
             { "node": 43, "message": "Rising Raptors", "yes": 0, "no": 0, "description": "Named after the stealth airplanes used by the Air Force, these are looking to soar to new heights."},
             { "node": 44, "message": "Flying Shrapnel", "yes": 0, "no": 0, "description": "Coming from all directions, the flying shrapnel will clear a path to victory."},
             { "node": 45, "message": "Surging Seawolf", "yes": 0, "no": 0, "description": "Named after the nuclear powered submarines, these vessels can go to deep depths and surface at any time."},
             { "node": 46, "message": "Twisting Tornadoes", "yes": 0, "no": 0, "description": "Formed from a storm, these blow into a field and knock down everything in their path."},
             { "node": 47, "message": "Torrid Typhoons", "yes": 0, "no": 0, "description": "Found in the ocean, these storms generate more energy than what could ever be found in a boat."},
             { "node": 48, "message": "Devestating Duvendal", "yes": 0, "no": 0, "description": "Named after the renowned sword of Roland, this sword symbolizes the heir to the throne."},
             { "node": 49, "message": "Arc's Angels", "yes": 0, "no": 0, "description": "Named after Joan of Arc, the French heroine that led an army against the English. Stay clear of her path!"},
             { "node": 50, "message": "Hannibal's Fire", "yes": 0, "no": 0, "description": "The Carthaginian General as a young boy was quoted as saying, I swear so soon as age will permit, I will use fire and steel to arrest the destiny of Rome."},
             { "node": 51, "message": "Amazing Airplanes", "yes": 0, "no": 0, "description": "Flying to new heights, these planes can fly in circles around the competition."}
];



// this is used for keep track of visted nodes when we test for loops in the tree
var visited;

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to mascot generator. I will ask you multiple questions that you should answer yes or no. Based on your choices, I will identify an appropriate mascot. Are you ready to begin?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start the mascot generator, or no to quit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to end the activity.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var promptToSayYesNo = "Say yes or no to answer the question.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "Based on exhaustive research, I recommend ";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Say 'tell me more' to hear a short description about the mascot and it's symbolism, or do you want to play again?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "I will ask you some questions that will identify what the best mascot for you would be based on a series of yes no questions. Want to start now?";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "Ok, see you next time!";

var speechNotFoundMessage = "Could not find speech for node";

var nodeNotFoundMessage = "In nodes array could not find node";

var descriptionNotFoundMessage = "Could not find description for node";

var loopsDetectedMessage = "A repeated path was detected on the node tree, please fix before continuing";

var utteranceTellMeMore = "tell me more";

var utterancePlayAgain = "play again";

// the first node that we will use
var START_NODE = 1;

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers, descriptionHandlers);
    alexa.execute();
};

// set state to start up and  welcome the user
var newSessionHandler = {
  'LaunchRequest': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },'AMAZON.HelpIntent': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', helpMessage, helpMessage);
  },
  'Unhandled': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', promptToStartMessage, promptToStartMessage);
  }
};

// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'AMAZON.YesIntent': function () {

        // ---------------------------------------------------------------
        // check to see if there are any loops in the node tree - this section can be removed in production code
        visited = [nodes.length];
        var loopFound = helper.debugFunction_walkNode(START_NODE);
        if( loopFound === true)
        {
            // comment out this line if you know that there are no loops in your decision tree
             this.emit(':tell', loopsDetectedMessage);
        }
        // ---------------------------------------------------------------

        // set state to asking questions
        this.handler.state = states.ASKMODE;

        // ask first question, the response will be handled in the askQuestionHandler
        var message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
        this.attributes.currentNode = START_NODE;

        // ask the first question
        this.emit(':ask', message, message);
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
         this.emit(':ask', promptToStartMessage, promptToStartMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function () {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
});


// user will have been asked a question when this intent is called. We want to look at their yes/no
// response and then ask another question. If we have asked more than the requested number of questions Alexa will
// make a choice, inform the user and then ask if they want to play again
var askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, {

    'AMAZON.YesIntent': function () {
        // Handle Yes intent.
        helper.yesOrNo(this,'yes');
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
         helper.yesOrNo(this, 'no');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'Unhandled': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// user has heard the final choice and has been asked if they want to hear the description or to play again
var descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, {

 'AMAZON.YesIntent': function () {
        // Handle Yes intent.
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'DescriptionIntent': function () {
        //var reply = this.event.request.intent.slots.Description.value;
        //console.log('HEARD: ' + reply);
        helper.giveDescription(this);
      },

    'Unhandled': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// --------------- Helper Functions  -----------------------

var helper = {

    // gives the user more information on their final choice
    giveDescription: function (context) {

        // get the speech for the child node
        var description = helper.getDescriptionForNode(context.attributes.currentNode);
        var message = description + ', ' + repeatWelcomeMessage;

        context.emit(':ask', message, message);
    },

    // logic to provide the responses to the yes or no responses to the main questions
    yesOrNo: function (context, reply) {

        // this is a question node so we need to see if the user picked yes or no
        var nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);

        // error in node data
        if (nextNodeId == -1)
        {
            context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist
            context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
        }

        // get the speech for the child node
        var message = helper.getSpeechForNode(nextNodeId);

        // have we made a decision
        if (helper.isAnswerNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
            message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;
            console.log("Recommendation: " + message);
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // gets the description for the given node id
    getDescriptionForNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].description;
            }
        }
        return descriptionNotFoundMessage + nodeId;
    },

    // returns the speech for the provided node id
    getSpeechForNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].message;
            }
        }
        return speechNotFoundMessage + nodeId;
    },

    // checks to see if this node is an choice node or a decision node
    isAnswerNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (nodes[i].yes === 0 && nodes[i].no === 0) {
                    return true;
                }
            }
        }
        return false;
    },

    // gets the next node to traverse to based on the yes no response
    getNextNode: function (nodeId, yesNo) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (yesNo == "yes") {
                    return nodes[i].yes;
                }
                return nodes[i].no;
            }
        }
        // error condition, didnt find a matching node id. Cause will be a yes / no entry in the array but with no corrosponding array entry
        return -1;
    },

    // Recursively walks the node tree looking for nodes already visited
    // This method could be changed if you want to implement another type of checking mechanism
    // This should be run on debug builds only not production
    // returns false if node tree path does not contain any previously visited nodes, true if it finds one
    debugFunction_walkNode: function (nodeId) {

        // console.log("Walking node: " + nodeId);

        if( helper.isAnswerNode(nodeId) === true) {
            // found an answer node - this path to this node does not contain a previously visted node
            // so we will return without recursing further

            // console.log("Answer node found");
             return false;
        }

        // mark this question node as visited
        if( helper.debugFunction_AddToVisited(nodeId) === false)
        {
            console.log("duplicate: " + nodeId);
            // node was not added to the visited list as it already exists, this indicates a duplicate path in the tree
            return true;
        }

        // console.log("Recursing yes path");
        var yesNode = helper.getNextNode(nodeId, "yes");
        var duplicatePathHit = helper.debugFunction_walkNode(yesNode);

        if( duplicatePathHit === true){
            return true;
        }

        // console.log("Recursing no");
        var noNode = helper.getNextNode(nodeId, "no");
        duplicatePathHit = helper.debugFunction_walkNode(noNode);

        if( duplicatePathHit === true){
            return true;
        }

        // the paths below this node returned no duplicates
        return false;
    },

    // checks to see if this node has previously been visited
    // if it has it will be set to 1 in the array and we return false (exists)
    // if it hasnt we set it to 1 and return true (added)
    debugFunction_AddToVisited: function (nodeId) {

        if (visited[nodeId] === 1) {
            // node previously added - duplicate exists
            // console.log("Node was previously visited - duplicate detected");
            return false;
        }

        // was not found so add it as a visited node
        visited[nodeId] = 1;
        return true;
    }
};
