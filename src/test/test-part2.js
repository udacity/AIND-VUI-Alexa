'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var index = require('../index');
var events = require('./events');
var resultArr = [];
var facts = require('../facts');
var utils = require('./utils');
var fs = require("fs");
var sch = JSON.parse(fs.readFileSync('../speechAssets/IntentSchema.json', 'utf-8'));
var utterances = fs.readFileSync('../speechAssets/SampleUtterances_en_US.txt', "utf-8");
var intents = sch.intents;
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
// https://www.thepolyglotdeveloper.com/2016/08/test-amazon-alexa-skills-offline-with-mocha-and-chai-for-node-js/
const context = require('aws-lambda-mock-context');
const ctx1 = context();
const ctx2 = context();
const ctx3 = context();
const ctx4 = context();

describe("Test Part 2", function () {
    describe("Testing utterance lists for GetNewYearFactIntent", function () {
        it('should have at least 15 utterances', function () {
            var count = (utterances.match(/GetNewYearFactIntent/g) || []).length;
            expect(count).to.be.gte(15)
        })
        it('should have at least 15 FACT_YEAR slots', function () {
            var count = (utterances.match(/{FACT_YEAR}/g) || []).length;
            expect(count).to.be.gte(15)
        })
    });
    describe("Testing IntentSchema for slots", function () {
        it('should include GetNewYearFactIntent', function () {
            var hasYearIntent = false;
            for (var i = 0; i < intents.length; i++) {
                if (intents[i].intent == "GetNewYearFactIntent") {
                    hasYearIntent = true
                }
            }
            expect(hasYearIntent).to.be.true
        })
        it('should include a slot', function () {
            var slots = null;
            for (var i = 0; i < intents.length; i++) {
                if (intents[i].intent == "GetNewYearFactIntent") {
                    slots = intents[i].slots
                }
            }
            expect(slots).to.exist
        })
        it('should include a slot named FACT_YEAR', function () {
            var hasCorrectSlot = false;
            var slots = null;
            for (var i = 0; i < intents.length; i++) {
                if (intents[i].intent == "GetNewYearFactIntent") {
                    slots = intents[i].slots
                    for (var j = 0; j < slots.length; j++) {
                        if (slots[j].name == "FACT_YEAR") {
                            hasCorrectSlot = true
                        }
                    }
                }
            }
            expect(hasCorrectSlot).to.be.true
        })
    });
    describe("Testing GetNewYearFactIntent with valid year", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(reqWithYear, ctx1)
            ctx1.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("The response is structurally correct", function () {
            it('should not have errored', function () {
                expect(speechError).to.be.null
            })
            it('should have a speechlet response', function () {
                expect(speechResponse.response).to.exist
            })

            it("should have a spoken response", () => {
                expect(speechResponse.response.outputSpeech).to.exist
            })

            it("should have a card response", () => {
                expect(speechResponse.response.card).to.exist
            })
        })
        describe("The response is functionally correct", function () {
            it("should have year in the spoken response", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                var slotValue = reqWithYear.request.intent.slots.FACT_YEAR.value;
                var hasYear = msg.includes(slotValue);
                expect(hasYear).to.be.true
            })
        })
    });
    describe("Testing GetNewYearFactIntent with non-matching year 1 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewYearFactIntent, ctx2)
            ctx2.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("request for 9999 year", function () {
            it("should receive response", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                expect(msg).to.be.string
            })
        })
    });
    describe("Testing GetNewYearFactIntent with non-matching year 2 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewYearFactIntent, ctx3)
            ctx3.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("request for 9999 year", function () {
            it("should receive response", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                expect(msg).to.be.string
            })
        })
    });
    describe("Testing GetNewYearFactIntent with non-matching year 3 of 3", function () {
        var speechResponse = null;
        var speechError = null;

        before(function (done) {
            index.handler(events.GetNewYearFactIntent, ctx4)
            ctx4.Promise
                .then(resp => { speechResponse = resp; done(); })
                .catch(err => { speechError = err; done(); })
        })
        describe("three requests for 9999 year", function () {
            it("should have random spoken responses", () => {
                var msg = speechResponse.response.outputSpeech.ssml;
                resultArr.push(msg);
                if (resultArr.length >= 3) {
                    var atLeastOneNew = resultArr[0] != resultArr[1] || resultArr[1] != resultArr[2];
                    expect(atLeastOneNew).to.be.true
                }
            })
        })
    })
});
