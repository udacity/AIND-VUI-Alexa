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

describe("Testing a session with GetNewFactIntent 1", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewFactIntent, ctx1)
        ctx1.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            var msg = speechResponse.response.outputSpeech.ssml;
            resultArr.push(msg);
            expect(speechError).to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
    })    
});

describe("Testing a session with GetNewFactIntent 2", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewFactIntent, ctx2)
        ctx2.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it("should have a card response", () => {
            var msg = speechResponse.response.outputSpeech.ssml;
            resultArr.push(msg);
            expect(speechResponse.response.card).not.to.be.null
        })
    })      
});

describe("Testing a session with GetNewFactIntent 3", function () {
    var speechResponse = null;
    var speechError = null;

    before(function (done) {
        index.handler(events.GetNewFactIntent, ctx3)
        ctx3.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is functionally correct", function() {
        it("should have a random spoken response", () => {
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