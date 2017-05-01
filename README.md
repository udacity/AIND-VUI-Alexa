# Project: Build an Alexa History Skill
It's time to create your own Alexa Skill!.  Some basic template code similar to the Space Geek lab has been provided for you.  Your skill for this project will be a history skill, however, that also allows users to ask for facts from a particular year.  You are free to choose any category you wish for your facts.  For example, you could have a skill that provides historical facts about a sport, or a location, or hobby, but each fact you provide must include a four-digit year.  

If you are not sure what category you want to try, don't worry...an example file has been provided with a few historical facts about artificial intelligence to get you started.  It can be hard to come up with a robust list of suitable facts - feel free to crowd source a list of historical facts with your fellow students!

# Getting Started

#### Complete the Lab
If you haven't already done so, complete the [Space Geek lab](https://classroom.udacity.com/nanodegrees/nd889/parts/4550d1eb-a3e0-4e9b-9d3c-4f55aa6662b5/modules/38e74312-3173-4456-919d-bcb00a82bfb5/lessons/dc1efdfd-e07f-4a5c-ab35-dbb274a25c88/concepts/4cf534af-99c6-45c1-be50-4b39be711614) now!

#### Starter Code
Install your starter code locally
* Download or clone the [starter code](https://github.com/udacity/AIND-VUI-Alexa)
* Save it in a directory named `AIND-VUI-Alexa`

#### Environment

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
$ npm install --save-dev chai aws-lambda-mock-context
```
* You can also run the provided unit tests from the command line within the `src` directory with the following command.  Try it now:
```shell
$ npm test
```
* As you complete the tasks ahead, you can use these unit tests and write more yourself to quickly test code changes prior to deployment in the AWS lambda environment.

##### 4. Set up a code editor
* At this point, you can open your project with a code editor of your choice.  Some free ones that support Node.js include [Atom](https://atom.io/) and [Visual Studio Code](https://code.visualstudio.com/)


# Tasks

#### Modify the starter code to meet the following requirements:

`speechAssets`:
1. In addition to the `GetNewFactIntent` intent already included, add an [intent](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference) including a built-in [slot](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference) that will provide the user with a fact matching the year requested.  Name this intent `GetNewYearFactIntent`.
2. Provide at least 20 utterances for each of the two intents - good examples can be found [here](https://github.com/alexa/skill-sample-nodejs-fact/tree/master/speechAssets).

`src/facts.js`

1. Provide at least 10 historical facts in the category/domain of your choice.  A few AI facts have been provided to get you started if you want to use AI History as your domain.
2. All facts must include a 4-digit year in the text.  This is so the function can search for the year requested by the user when the `GetNewYearFactIntent` is invoked.

`src/index.js` (see TODO's in the starter code):

1. Modify and add messages and reprompts as needed to match your project, accommodate the
new intent, and carry on a short conversation.
2. Add the new `GetYearFactIntent` to the handler such that the user receives a random fact that matches the year asked for, if the user asks for a specific year.
3. Keep the session open after a fact is given to the user by implementing the `:askWithCard` statement instead of `:telllWithCard`
4. Provide a randomized response to the user to replace the existing `GET_FACT_MESSAGE` text.

#### Test your code locally with unit tests

1. From the `src` directory, all provided unit tests should pass when the following command is run:
```shell
$ npm test
```


#### Deploy your new code as an Alexa Skill through Alexa Skills Kit and AWS Lambda:

1. Create the new skill as you did before in Amazon Developer and Amazon Lambda
   - Give the skill a new name and [invocation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill) 
2. To [upload to AWS Lambda](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/deploying-a-sample-skill-to-aws-lambda#preparing-a-nodejs-sample-to-deploy-in-lambda), you must zip the following files and use the upload feature on AWS lambda: 
   - `index.js` file
   - `facts.js` file
   - `node_modules` directory
3. Test your project with the [Service Simulator](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill) inside the ASK Developer Console and one or more of the following:
   - [Echosim.io](https://echosim.io/): web browser simulator
   - [Alexa app](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app): view cards
   - Amazon Echo, Echo Dot, Echo Tap devices: if the device is on the same account as the development code, you can "open" the skill there
4. Screen capture the Service Simulator response to the question "give me a fact for 1974" and save it as `my_capture.png`.  You will need this for your project submission.

