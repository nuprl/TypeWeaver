"use strict";

var assert: any = require("@sinonjs/referee-sinon").assert;
var knuthShuffle: any = require("knuth-shuffle").knuthShuffle;
var sinon: any = require("@sinonjs/referee-sinon").sinon;
var orderByFirstCall: any = require("./order-by-first-call");

describe("orderByFirstCall", function() {
    it("should order an Array of spies by the callId of the first call, ascending", function() {
        // create an array of spies
        var spies: any[] = [
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy(),
            sinon.spy()
        ];

        // call all the spies
        spies.forEach(function(spy: any) {
            spy();
        });

        // add a few uncalled spies
        spies.push(sinon.spy());
        spies.push(sinon.spy());

        // randomise the order of the spies
        knuthShuffle(spies);

        var sortedSpies: any[] = orderByFirstCall(spies);

        assert.equals(sortedSpies.length, spies.length);

        var orderedByFirstCall: boolean = sortedSpies.every(function(spy: any, index: number) {
            if (index + 1 === sortedSpies.length) {
                return true;
            }
            var nextSpy: any = sortedSpies[index + 1];

            // uncalled spies should be ordered first
            if (!spy.called) {
                return true;
            }

            return spy.calledImmediatelyBefore(nextSpy);
        });

        assert.isTrue(orderedByFirstCall);
    });
});
