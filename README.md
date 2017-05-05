# Project: Build an Alexa History Skill
![Alexa skill process overview](images/skillOverview.png)

It's time to create your own Alexa Skill!.  In this project, you’ll build a fully functional skill for [Amazon’s Alexa](https://developer.amazon.com/alexa) that provides year-dated facts from AI History (or some other History of your choosing).  Through the process, you’ll get to use the [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit) - a current state of the art API for building voice systems.  

# Getting Started

### Set up your Amazon accounts

We highly recommend you complete the [Space Geek lab](https://classroom.udacity.com/nanodegrees/nd889/parts/4550d1eb-a3e0-4e9b-9d3c-4f55aa6662b5/modules/38e74312-3173-4456-919d-bcb00a82bfb5/lessons/dc1efdfd-e07f-4a5c-ab35-dbb274a25c88/concepts/4cf534af-99c6-45c1-be50-4b39be711614), which steps you through setting up your Amazon Developer and Amazon AWS accounts as well as the project this one is based on.   If you’ve already done that you can skip this step. 
*find more detail on this in the classroom*

### Starter Code
Install your starter code locally.
* Download or clone the [starter code](https://github.com/udacity/AIND-VUI-Alexa) from GitHub
* Save it in a directory named `AIND-VUI-Alexa`.  It contains the following directories and files:
    - **speechAssets/IntentSchema.json**  - intents definition for the interactive model
    - **speechAssets/SampleUtterances_en_US.txt** - utterances for the interactive model
    - **src/index.js** - skill logic and handlers to be run in AWS Lamda
    - **src/facts.js** - a list of facts that the skill will use in responses
    - **tests/*.js** - various unit tests to be run locally with mocha; you do not need to change these

### Environment

##### 1. Install [Node.js](https://nodejs.org/) per instructions on the website for your machine.

##### 2. Install dependencies for the project

* Navigate to the `AIND-VUI-Alexa/src` directory of the starter code and open a terminal window.  
* The AWS Lambda function we used in the Space Geek lab was built on Node.js and included a linked [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) library for Alexa.  We will install this locally as well.  Install the `alexa-sdk` library with the following command:
```shell
$ npm install --save alexa-sdk
```
* There should now be a directory named `node_modules` within the `src` directory.  This is how Node.js attaches libraries for your code.

##### 3. Install development dependencies for unit testing
* We will be using the [mocha](https://mochajs.org/) test framework for Node.js along with [chai](http://chaijs.com/) and [aws-lambda-mock-context](https://www.npmjs.com/package/aws-lambda-mock-context) for local unit testing. Install these with the following command:
```shell
$ npm install --save-dev mocha chai aws-lambda-mock-context
```
* You can run the provided unit tests from the command line within the `src` directory with the following command.  Try it now:
```shell
$ npm test
```
The starter code should pass the starter code tests but fail the rest.  As you complete the tasks ahead, you can use these unit tests (and write more yourself) to quickly test code changes prior to deployment to AWS Lambda.

##### 4. Set up a code editor
* At this point, you can open your project with a code editor of your choice.  Some free ones that support Node.js include [Atom](https://atom.io/) and [Visual Studio Code](https://code.visualstudio.com/)
* The javascript skills needed for this project are mostly about following patterns you find in the existing code and general coding constructs such as for loops, if statements, and arrays.  You may need to make liberal use of search engines to find the exact syntax you need, however, if you are not familiar with javascript and Node.js.  Here are a few links that might be helpful:
    * [js for loops](https://www.w3schools.com/js/js_loop_for.asp)
    * [js conditional statements](https://www.w3schools.com/js/js_if_else.asp)
    * [js arrays](https://www.w3schools.com/js/js_arrays.asp)
    * [js String includes() method](https://www.w3schools.com/jsref/jsref_includes.asp)
    * [js JSON](https://www.w3schools.com/js/js_json.asp)
    * [Alexa skill examples](https://github.com/alexa)
    * [Node.js API reference](https://nodejs.org/dist/latest-v6.x/docs/api/)

##### 5. Run the Starter Code on AWS Lambda
* Deploy the starter code to verify that it works with your accounts in its simple form.   This is the same process you went through with the Space Geek Lab.  If you need a refresher, step-by-step instructions are provided in the classroom. 

# Tasks

The starter code provides a simple fact skill similar to Space Geek, except a few AI history facts have been provided in an external file, `facts.js`, instead of the space facts.  Each fact includes a 4-digit year in its text, which we will use in the project for a new feature.  

The project consists of three parts:
1. Customize the fact skill
2. Add a feature using an additional intent and a slot
3. Add conversational elements

## Part 1: Customize the fact skill
##### 1. Choose a history category you wish to use for your skill.  You can continue to use the AI History Facts already started for you if you wish.
##### 2. Expand the utterances in the `speechAssets/SampleUtterances_en_US.txt` file to include at least 15 appropriate utterances for ` GetNewFactIntent`.   Examples can be found [here](https://github.com/alexa/skill-sample-nodejs-fact/tree/master/speechAssets).
##### 3. Expand the facts list in `facts.js` such that there are at least 10 distinct facts, where each includes a 4-digit year in its text.  These will be spoken by the Amazon Text-To-Speech algorithm (TTS), so keep in mind where you wish pauses to occur.  To hear how it sounds, enter your sentence in the developer portal under the “Test” section:
##### 4. Test it.   All “Starter Code” and “Part 1” local unit tests should pass.  Try the skill out by uploading your changes to the Interactive model in the Developer Portal and AWS Lambda.

## Part 2: Add a feature
In addition to the `GetNewFactIntent` intent already included, add an [intent](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference) including a built-in [slot](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference) named `FACT_YEAR` that will provide the user with a fact matching the year requested.  Name this intent `GetNewYearFactIntent`.  Built-in Amazon slots can be used for the year.  Consider using [AMAZON.FOUR_DIGIT_NUMBER](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#four_digit_number) for this purpose. This is not required, however, if you prefer to try a different slot definition.
##### 1. Provide at least 15 utterances for the new intent. 
##### 2. Complete the TODO’s in `index.js` to implement a handler for `GetNewYearFactIntent` that will provide a fact for the specific year requested, and provide a random fact if the year is not found in the fact list.
##### 3. Test it.   All “Starter Code”, “Part 1”, and “Part 2” local unit tests should pass.  Try the skill out by uploading your changes to the Interactive model in the Developer Portal and AWS Lambda.

## Part 3: Add conversational elements
As discussed in the videos, conversations with a VUI will seem more natural if the session window can be left open to continue request/response interactions.  Additionally, adding randomization to the Alexa response text provides a more natural feel to the conversation.
##### 1. Change your “tell” statements to “ask” statements as directed by the TODO’s in `index.js` and include reprompt messages as necessary.
##### 2. Change the `GET_FACT_MESSAGE` snippet to an array of at least 5 similar phrases.  Randomize this portion of the Alexa response.
##### 3. Test it.   All local tests should now pass.  Deploy your changes to the Interactive model in the Developer Portal and AWS Lambda.
##### 4. Provide a screen capture (PNG) from the Service Simulator in the Developer portal of your skill working.  The screen capture should include the part of the Lambda Request that shows the `GetNewYearFactIntent` and `slot` with the year requested.  The Lambda Response side only needs to show that a fact was provided.  Note that in order to request a slot with the Simulator, you will need to phonetically request a year.  For example, if the year is 2012, the input will need to be “two thousand and twelve” rather than “2012” in the simulator. Save the screen capture for submission with the name `skill_simulator.png`

## Optional Additional Testing
In addition to testing with unit tests and the Service Simulator, you may find it useful to try your skill with one or more of the following:
* [Echosim.io](https://echosim.io/): web browser simulator
* [Alexa app](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app): view card
* Amazon Echo, Echo Dot, Echo Tap devices: if the device is on the same account as the development code, you can "open" the skill there.
