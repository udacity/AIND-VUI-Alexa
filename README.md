# Artificial Intelligence Engineer Nanodegree
## Voice User Interface (VUI) Concentration
## Project: Alexa Fact Skill

### Install

This project requires [Node.js](https://nodejs.org) and the following npm libraries installed:

- [alexa-sdk](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)


### Code

see Amazon instructions to set up `space geek`, then:
- add an intent
- add a slot
- separate `facts.js`
- make conversational with `ask` and `reprompt`


### Run

need an Amazon login -> then create accounts for 
- [Amazon Developer](https://developer.amazon.com/alexa)
- [AWS lambda](https://aws.amazon.com/) - requires a credit card to set up, but comes with one year of some free services

### Test
- [Service Simulator](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/testing-an-alexa-skill)
- [Echosim.io](https://echosim.io/)
- [Add a beta tester... hmmmm](https://developer.amazon.com/blogs/post/Tx2EN8P2AHAHO6Y/how-to-add-beta-testers-to-your-skills-before-you-publish)
- [view card in Alexa app](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app)
- **Echo, Echo Dot, Echo Tap devices**: if the device is on the same account, you can "open" the skill there.


### Additional Information

### Development notes
- After initial setup, to use upload must package the `node_modules` directory in the `.zip` as well as `index.js` and data such as `facts.js` for upload to AWS-lambda function. At this point you will no longer be able to modify directly in-line on AWS lamdas unless the node_modules are in AWS-S3.
- Students can use whatever kind of fact set they want to personalize the experience.  We will use a crowd-sourced list of "AI History Facts" that may be used for the project.  The thinking is that the `facts.js` file can be substituted for testing, though the `facts.js` file that students provide will need to conform to certain parameters.
- To test, we will want to ensure that students:
	- Have a reasonable number of facts that include a year in each line of text
	- Have added an intent to handle requests by year
	- Have properly used a slot to decode the year and use it in choosing a fact
	- Have provided an "ask" to carry on a small session of fact requests.