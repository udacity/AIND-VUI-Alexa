'use strict'
var expect = require('chai').expect;
var assert = require('chai').assert;
var fs = require("fs");
var sch = JSON.parse(fs.readFileSync('../speechAssets/IntentSchema.json', 'utf-8'));
var utterances = fs.readFileSync('../speechAssets/SampleUtterances_en_US.txt', "utf-8");
var intents = sch.intents;

describe("Testing utterance lists", function () {

    it('should have at least 15 utterances for GetNewFactIntent', function () {
        var count = (utterances.match(/GetNewFactIntent/g) || []).length;
        expect(count).to.be.greaterThan(15)
    })
    it('should have at least 15 utterances for GetNewYearFactIntent', function () {
        var count = (utterances.match(/GetNewYearFactIntent/g) || []).length;
        expect(count).to.be.greaterThan(15)
    })
    it('should have at least 15 FACT_YEAR slots', function() {
        var count = (utterances.match(/{FACT_YEAR}/g) || []).length;
        expect(count).to.be.greaterThan(15)
    })
});

describe("Testing IntentSchema for slots", function() {

    it('should include GetNewYearFactIntent', function() {
        var hasYearIntent = false;
        for (var i=0; i<intents.length; i++)
        {
            if (intents[i].intent == "GetNewYearFactIntent")
            {
                hasYearIntent = true
            }
        }
        expect(hasYearIntent).to.be.true
    })
    it('should include a slot', function() {
        var slots = null;
        for (var i=0; i<intents.length; i++)
        {
            if (intents[i].intent == "GetNewYearFactIntent")
            {
                slots = intents[i].slots
            }
        }
        expect(slots).is.not.null
    })
    it('should include a slot named FACT_YEAR', function() {
        var hasCorrectSlot = false;
        var slots = null;
        for (var i=0; i<intents.length; i++)
        {
            if (intents[i].intent == "GetNewYearFactIntent")
            {
                slots = intents[i].slots
                for (var j=0; j<slots.length; j++)
                {
                    if (slots[j].name == "FACT_YEAR")
                    {
                        hasCorrectSlot = true
                    }
                }
            }
        }
        expect(hasCorrectSlot).to.be.true
    })
});
