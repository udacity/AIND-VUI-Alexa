'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var index = require('../index');
var events = require('./events');
var resultArr = []

// https://www.thepolyglotdeveloper.com/2016/08/test-amazon-alexa-skills-offline-with-mocha-and-chai-for-node-js/
const context = require('aws-lambda-mock-context');
const ctx1 = context();
const ctx2 = context();
const ctx3 = context();
const ctx_help = context();
const ctx_cancel = context();
const ctx_stop = context();

describe("Starter Code Tests", function () {
    describe("for a session with AMAZON.HelpIntent", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.HelpIntent, ctx_help)
            ctx_help.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it('should not have errored', function () {
                expect(speechError).to.not.exist
            })

            it('should have a speechlet response', function () {
                expect(speechResponse.response).to.exist
            })

            it("should have a spoken response", () => {
                expect(speechResponse.response.outputSpeech).to.exist
            })

            it("should have a reprompt available", () => {
                expect(speechResponse.response.reprompt).to.exist
            })

            it("should not end the alexa session", function () {
                expect(speechResponse.response.shouldEndSession).to.exist
                expect(speechResponse.response.shouldEndSession).to.be.false
            })
        })
    });
    describe("for a session with AMAZON.CancelIntent", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.CancelIntent, ctx_cancel)
            ctx_cancel.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it('should not have errored', function () {
                expect(speechError).to.not.exist
            })

            it('should have a speechlet response', function () {
                expect(speechResponse.response).to.exist
            })

            it("should have a spoken response", () => {
                expect(speechResponse.response.outputSpeech).to.exist
            })

            it("should have no reprompt", () => {
                expect(speechResponse.response.reprompt).to.not.exist
            })

            it("should end the alexa session", function () {
                expect(speechResponse.response.shouldEndSession).to.exist
                expect(speechResponse.response.shouldEndSession).to.be.true
            })
        })
    });
    describe("for a session with AMAZON.StopIntent", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.StopIntent, ctx_stop)
            ctx_stop.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it('should not have errored', function () {
                expect(speechError).to.not.exist
            })

            it('should have a speechlet response', function () {
                expect(speechResponse.response).to.exist
            })

            it("should have a spoken response", () => {
                expect(speechResponse.response.outputSpeech).to.exist
            })
            
            it("should have no reprompt", () => {
                expect(speechResponse.response.reprompt).to.not.exist
            })

            it("should end the alexa session", function () {
                expect(speechResponse.response.shouldEndSession).to.exist
                expect(speechResponse.response.shouldEndSession).to.be.true
            })
        })
    });
    describe("for a session with GetNewFactIntent 1 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewFactIntent, ctx1)
            ctx1.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it('should not have errored', function () {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                expect(speechError).to.not.exist
            })

            it('should have a speechlet response', function () {
                expect(speechResponse.response).to.exist
            })

            it("should have a spoken response", () => {
                expect(speechResponse.response.outputSpeech).to.exist
            })
        })
    });

    describe("for a session with GetNewFactIntent 2 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewFactIntent, ctx2)
            ctx2.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it("should have a card response", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                expect(speechResponse.response.card).to.exist
            })
        })
    });

    describe("for a session with GetNewFactIntent 3 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewFactIntent, ctx3)
            ctx3.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is functionally correct", function () {
            it("should have a random spoken response", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                var atLeastOneNew = false;
                if (resultArr.length >= 3) {
                    atLeastOneNew = resultArr[0] != resultArr[1] || resultArr[1] != resultArr[2];
                }
                expect(atLeastOneNew).to.be.true
            })
        })
    });
});