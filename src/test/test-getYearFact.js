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
const ctx4 = context();


describe("Testing a session with GetNewYearFactIntent", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewYearFactIntent, ctx1)
        ctx1.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct", function () {
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

    describe("The response is functionally correct for the project requirements", function() {
        it("should have a spoken response inclulding year", () => {
            var msg = speechResponse.response.outputSpeech.ssml;
            var slotValue = events.GetNewYearFactIntent.request.intent.slots.FACT_YEAR.value
            var hasYear = msg.includes(slotValue);
            assert.isTrue(hasYear, 'the year is in the response');
        })
    })
});
describe("Testing GetNewYearFactIntent with non-matching year is functionally correct", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewYearFactIntent_0000, ctx2)
        ctx2.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("request for 0000 year", function() {
        it("should receive response", () => {
            var msg = speechResponse.response.outputSpeech.ssml;
            resultArr.push(msg);
            expect(msg).to.be.string
        })
    })
});
describe("Testing GetNewYearFactIntent with non-matching year is functionally correct", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewYearFactIntent_0000, ctx3)
        ctx3.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("request for 0000 year", function() {
        it("should receive response", () => {
            var msg = speechResponse.response.outputSpeech.ssml;
            resultArr.push(msg);
            expect(msg).to.be.string
        })
    })
});
describe("Testing GetNewYearFactIntent with non-matching year is functionally correct", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewYearFactIntent_0000, ctx4)
        ctx4.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("three requests for 0000 year", function() {
        it("should have random spoken responses if no year given", () => {
            var msg = speechResponse.response.outputSpeech.ssml;
            resultArr.push(msg);
            if (resultArr.length==3)
            {
                var atLeastOneNew = resultArr[0] != resultArr[1] || resultArr[1] != resultArr[2];
                expect(atLeastOneNew).to.be.true
            }
        })
    })
});