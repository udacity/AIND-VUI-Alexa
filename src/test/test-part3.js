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
                expect(speechResponse.response.reprompt).not.to.be.undefined
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
                    expect(speechResponse.response.shouldEndSession).not.to.be.null
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
                    var numPhrasesUsed = calcNumPhrasesIncluded(resultArr, index.GetFactMsg);
                    expect(numPhrasesUsed).to.be.gt(1)
                })
            })
        })
        describe("Testing conversational elements of GetNewYearFactIntent", function () {
            var speechResponse = null;
            var speechError = null;

            before(function (done) {
                index.handler(events.GetNewFactIntent, ctx4)
                ctx4.Promise
                    .then(resp => { speechResponse = resp; done(); })
                    .catch(err => { speechError = err; done(); })
            })
            describe("The response keeps the conversation open", function () {
                it("should have a reprompt available", () => {
                    expect(speechResponse.response.reprompt).not.to.be.undefined
                })
                it("should not end the alexa session", function () {
                    expect(speechResponse.response.shouldEndSession).to.be.false
                })
            })
        })
    })
});
function calcNumPhrasesIncluded(msgArr, phraseArr) {
    // counts the number of these phrases found in the messages
    // does not account for phrases within phrases
    var numUsed = 0;
    for(var i = 0; i<phraseArr.length; i++){
        var inTheMsg = false;
        for(var j=0; j<msgArr.length; j++){
            if(msgArr[j].includes(phraseArr[i])){
                inTheMsg = true;
            }
        }
        if(inTheMsg){
            numUsed++;
        }
    }
    return numUsed;
}