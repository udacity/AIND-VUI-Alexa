var expect = require('chai').expect;
var index = require('../index');
var events = require('./events');

// https://www.thepolyglotdeveloper.com/2016/08/test-amazon-alexa-skills-offline-with-mocha-and-chai-for-node-js/
const context = require('aws-lambda-mock-context');
const ctx = context();

describe("Testing a session with GetNewFactIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewFactIntent, ctx)
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        // it('should have a version', function () {
        //     expect(speechResponse.version).not.to.be.null
        // })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        // it('should have session attributes', function () {
        //     expect(speechResponse.response.sessionAttributes).not.to.be.null
        // })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should have a card", () => {
            expect(speechResponse.response.card).not.to.be.null
        })

        it("should have a reprompt available", () => {
            expect(speechResponse.response.reprompt).not.to.be.null
        })

        it("should not end the alexa session", function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })
});

describe("Testing a session with GetNewYearFactIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewYearFactIntent, ctx)
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should have a card response", () => {
            expect(speechResponse.response.card).not.to.be.null
        })

        it("should have a reprompt available", () => {
            expect(speechResponse.response.reprompt).not.to.be.null
        })

        it("should not end the alexa session", function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })
});

describe("Testing a session with AMAZON.HelpIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.HelpIntent, ctx)
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should have a card response", () => {
            expect(speechResponse.response.card).not.to.be.null
        })

        it("should have a reprompt available", () => {
            expect(speechResponse.response.reprompt).not.to.be.null
        })

        it("should not end the alexa session", function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })
});

describe("Testing a session with AMAZON.CancelIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.CancelIntent, ctx)
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        // it("should have no card response", () => {
        //     expect(speechResponse.response.card).to.be.null
        // })

        // it("should have no reprompt", () => {
        //     expect(speechResponse.response.reprompt).to.be.null
        // })

        // it("should end the alexa session", function () {
        //     expect(speechResponse.response.shouldEndSession).not.to.be.null
        //     expect(speechResponse.response.shouldEndSession).to.be.true
        // })
    })
});

describe("Testing a session with AMAZON.StopIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.StopIntent, ctx)
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        // it("should have no card response", () => {
        //     expect(speechResponse.response.card).to.be.null
        // })

        // it("should have no reprompt", () => {
        //     expect(speechResponse.response.reprompt).to.be.null
        // })

        // it("should end the alexa session", function () {
        //     expect(speechResponse.response.shouldEndSession).not.to.be.null
        //     expect(speechResponse.response.shouldEndSession).to.be.true
        // })
    })
});
