'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var index = require('../index');
var events = require('./events');
var facts = require('../facts');
var utils = require('./utils');
var resultArr = []

// https://www.thepolyglotdeveloper.com/2016/08/test-amazon-alexa-skills-offline-with-mocha-and-chai-for-node-js/
const context = require('aws-lambda-mock-context');
const ctx1 = context();
const ctx2 = context();
const ctx3 = context();
const ctx4 = context();
const ctx5 = context();
var yearsArr = [];
for (var i = 0; i < facts.FACTS_EN.length; i++) {
    var yearFound = utils.grepFourDigitNumber(facts.FACTS_EN[i]);
    if (yearFound != null) {
        yearsArr.push(yearFound)
    }
};
var reqWithYear = events.GetNewYearFactIntent;
if (yearsArr.length > 0) {
    reqWithYear = events.GetNewYearFactIntent2; // deep copy of GetNewYearFactIntent
    reqWithYear.request.intent.slots.FACT_YEAR.value = yearsArr[0];
};
describe("Test Part 3", function () {
    describe("Testing conversational elements of GetNewFactIntent 1 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewFactIntent, ctx1)
            ctx1.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response keeps the conversation open", function () {
            it("should have a reprompt available", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                expect(speechResponse.response.reprompt).to.exist
            })
        })
        describe("Testing conversational elements of GetNewFactIntent 2 of 3", function () {
            var speechResponse = null;
            var speechError = null;

            before(function (done) {
                index.handler(events.GetNewFactIntent, ctx2)
                ctx2.Promise
                    .then(resp => { speechResponse = resp; done(); })
                    .catch(err => { speechError = err; done(); })
            })
            describe("The response keeps the conversation open", function () {
                it("should not end the alexa session", function () {
                    var msg = speechResponse.response.outputSpeech.ssml;
                    resultArr.push(msg);
                    expect(speechResponse.response.shouldEndSession).to.exist
                    expect(speechResponse.response.shouldEndSession).to.be.false
                })
            })
        })
        describe("Testing conversational elements of GetNewFactIntent 3 of 3", function () {
            var speechResponse = null;
            var speechError = null;

            before(function (done) {
                index.handler(events.GetNewFactIntent, ctx3)
                ctx3.Promise
                    .then(resp => { speechResponse = resp; done(); })
                    .catch(err => { speechError = err; done(); })
            })
            describe("Testing GET_FACT_MESSAGE Random segments", function () {
                it("should include at least 5 different phrase options", () => {
                    expect(index.GetFactMsg.length).to.be.gte(5)
                })
                it("should randomly include segments from the GET_FACT_MESSAGE array", () => {
                    var msg = speechResponse.response.outputSpeech.ssml;
                    resultArr.push(msg);
                    var atLeastOneNew = false;
                    var numPhrasesUsed = utils.calcNumPhrasesIncluded(resultArr, index.GetFactMsg);
                    expect(numPhrasesUsed).to.be.gt(1)
                })
            })
        })
        describe("Testing conversational elements of GetNewYearFactIntent with valid year", function () {
            var speechResponse = null;
            var speechError = null;

            before(function (done) {
                index.handler(reqWithYear, ctx4)
                ctx4.Promise
                    .then(resp => { speechResponse = resp; done(); })
                    .catch(err => { speechError = err; done(); })
            })
            describe("The response keeps the conversation open", function () {
                it("should have a reprompt available", () => {
                    expect(speechResponse.response.reprompt).to.exist
                })
                it("should not end the alexa session", function () {
                    expect(speechResponse.response.shouldEndSession).to.be.false
                })
            })
        })
        describe("Testing conversational elements of GetNewYearFactIntent with non-matching year", function () {
            var speechResponse = null;
            var speechError = null;

            before(function (done) {
                index.handler(events.GetNewYearFactIntent, ctx5)
                ctx5.Promise
                    .then(resp => { speechResponse = resp; done(); })
                    .catch(err => { speechError = err; done(); })
            })
            describe("The response keeps the conversation open", function () {
                it("should have a reprompt available", () => {
                    expect(speechResponse.response.reprompt).to.exist
                })
                it("should not end the alexa session", function () {
                    expect(speechResponse.response.shouldEndSession).to.be.false
                })
            })
        })
    })
});