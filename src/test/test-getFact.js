'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var index = require('../index');
var events = require('./events');
var resultArr = []

// https://www.thepolyglotdeveloper.com/2016/08/test-amazon-alexa-skills-offline-with-mocha-and-chai-for-node-js/
const context = require('aws-lambda-mock-context');
const ctx1 = context();

describe("Testing customization of GetNewFactIntent", function () {
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
            expect(speechResponse.response.reprompt).not.to.be.null
        })

        it("should not end the alexa session", function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })      
});