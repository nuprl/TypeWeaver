"use strict";

var assert: Array = require("@sinonjs/referee-sinon").assert;
var knuthShuffle: Function = require("knuth-shuffle").knuthShuffle;
var sinon: HTMLElement = require("@sinonjs/referee-sinon").sinon;
var orderByFirstCall: Function = require("./order-by-first-call");

describe("orderByFirstCall", function() {
    it("should order an Array of spies by the callId of the first call, ascending", function() {
        // create an array of spies
        var spies: Array = [
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy()
        ];

        // call all the spies
        spies.forEach(function(spy: Function) {
            spy();
        });

        // add a few uncalled spies
        spies.push(sinon.spy());
        spies.push(sinon.spy());

        // randomise the order of the spies
        knuthShuffle(spies);

        var sortedSpies: Array = orderByFirstCall(spies);

        assert.equals(sortedSpies.length, spies.length);

        var orderedByFirstCall: Number = sortedSpies.every(function(spy: HTMLElement, index: Number) {
            if (index + 1 === sortedSpies.length) {
                return true;
            }
            var nextSpy: Array = sortedSpies[index + 1];

            // uncalled spies should be ordered first
            if (!spy.called) {
                return true;
            }

            return spy.calledImmediatelyBefore(nextSpy);
        });

        assert.isTrue(orderedByFirstCall);
    });
});
