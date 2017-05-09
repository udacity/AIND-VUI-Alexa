'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require("fs");
var sch = JSON.parse(fs.readFileSync('../speechAssets/IntentSchema.json', 'utf-8'));
var utterances = fs.readFileSync('../speechAssets/SampleUtterances_en_US.txt', "utf-8");
var intents = sch.intents;
var facts = require('../facts');
var utils = require('./utils');

describe("Test Part 1", function () {
    describe("Testing utterance list", function () {
        it('should have at least 15 utterances for GetNewFactIntent', function () {
            var count = (utterances.match(/GetNewFactIntent/g) || []).length;
            expect(count).to.be.gte(15)
        })
    })
    describe("Testing fact list items", function () {
        it('should have at least 10 facts', function () {
            expect(facts.FACTS_EN.length).to.be.gte(10)
        })
        it('should each include a 4-digit year', function () {
            var has4Digits = true;
            for (var i = 0; i < facts.FACTS_EN.length; i++) {
                if (!utils.hasFourDigitNumber(facts.FACTS_EN[i])) {
                    has4Digits = false;
                    console.log('FAILED FACT:' + facts.FACTS_EN[i])
                }
            }
            expect(has4Digits).to.be.true
        })
    })
});