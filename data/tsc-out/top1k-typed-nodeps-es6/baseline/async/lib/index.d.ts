declare namespace _default {
    export { apply };
    export { applyEach };
    export { applyEachSeries };
    export { asyncify };
    export { auto };
    export { autoInject };
    export { cargo };
    export { cargoQueue };
    export { compose };
    export { concat };
    export { concatLimit };
    export { concatSeries };
    export { constant };
    export { detect };
    export { detectLimit };
    export { detectSeries };
    export { dir };
    export { doUntil };
    export { doWhilst };
    export { each };
    export { eachLimit };
    export { eachOf };
    export { eachOfLimit };
    export { eachOfSeries };
    export { eachSeries };
    export { ensureAsync };
    export { every };
    export { everyLimit };
    export { everySeries };
    export { filter };
    export { filterLimit };
    export { filterSeries };
    export { forever };
    export { groupBy };
    export { groupByLimit };
    export { groupBySeries };
    export { log };
    export { map };
    export { mapLimit };
    export { mapSeries };
    export { mapValues };
    export { mapValuesLimit };
    export { mapValuesSeries };
    export { memoize };
    export { nextTick };
    export { parallel };
    export { parallelLimit };
    export { priorityQueue };
    export { queue };
    export { race };
    export { reduce };
    export { reduceRight };
    export { reflect };
    export { reflectAll };
    export { reject };
    export { rejectLimit };
    export { rejectSeries };
    export { retry };
    export { retryable };
    export { seq };
    export { series };
    export { setImmediate };
    export { some };
    export { someLimit };
    export { someSeries };
    export { sortBy };
    export { timeout };
    export { times };
    export { timesLimit };
    export { timesSeries };
    export { transform };
    export { tryEach };
    export { unmemoize };
    export { until };
    export { waterfall };
    export { whilst };
    export { every as all };
    export { everyLimit as allLimit };
    export { everySeries as allSeries };
    export { some as any };
    export { someLimit as anyLimit };
    export { someSeries as anySeries };
    export { detect as find };
    export { detectLimit as findLimit };
    export { detectSeries as findSeries };
    export { concat as flatMap };
    export { concatLimit as flatMapLimit };
    export { concatSeries as flatMapSeries };
    export { each as forEach };
    export { eachSeries as forEachSeries };
    export { eachLimit as forEachLimit };
    export { eachOf as forEachOf };
    export { eachOfSeries as forEachOfSeries };
    export { eachOfLimit as forEachOfLimit };
    export { reduce as inject };
    export { reduce as foldl };
    export { reduceRight as foldr };
    export { filter as select };
    export { filterLimit as selectLimit };
    export { filterSeries as selectSeries };
    export { asyncify as wrapSync };
    export { whilst as during };
    export { doWhilst as doDuring };
}
export default _default;
/**
 * An "async function" in the context of Async is an asynchronous function with
 * a variable number of parameters, with the final parameter being a callback.
 * (`function (arg1, arg2, ..., callback) {}`)
 * The final callback is of the form `callback(err, results...)`, which must be
 * called once the function is completed.  The callback should be called with a
 * Error as its first argument to signal that an error occurred.
 * Otherwise, if no error occurred, it should be called with `null` as the first
 * argument, and any additional `result` arguments that may apply, to signal
 * successful completion.
 * The callback must be called exactly once, ideally on a later tick of the
 * JavaScript event loop.
 *
 * This type of function is also referred to as a "Node-style async function",
 * or a "continuation passing-style function" (CPS). Most of the methods of this
 * library are themselves CPS/Node-style async functions, or functions that
 * return CPS/Node-style async functions.
 *
 * Wherever we accept a Node-style async function, we also directly accept an
 * [ES2017 `async` function]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function}.
 * In this case, the `async` function will not be passed a final callback
 * argument, and any thrown error will be used as the `err` argument of the
 * implicit callback, and the return value will be used as the `result` value.
 * (i.e. a `rejected` of the returned Promise becomes the `err` callback
 * argument, and a `resolved` value becomes the `result`.)
 *
 * Note, due to JavaScript limitations, we can only detect native `async`
 * functions and not transpilied implementations.
 * Your environment must have `async`/`await` support for this to work.
 * (e.g. Node > v7.6, or a recent version of a modern browser).
 * If you are using `async` functions through a transpiler (e.g. Babel), you
 * must still wrap the function with [asyncify]{@link module :Utils.asyncify},
 * because the `async function` will be compiled to an ordinary function that
 * returns a promise.
 */
export type AsyncFunction = Function;
import apply from "./apply";
import applyEach from "./applyEach";
import applyEachSeries from "./applyEachSeries";
import asyncify from "./asyncify";
import auto from "./auto";
import autoInject from "./autoInject";
import cargo from "./cargo";
import cargoQueue from "./cargoQueue";
import compose from "./compose";
import concat from "./concat";
import concatLimit from "./concatLimit";
import concatSeries from "./concatSeries";
import constant from "./constant";
import detect from "./detect";
import detectLimit from "./detectLimit";
import detectSeries from "./detectSeries";
import dir from "./dir";
import doUntil from "./doUntil";
import doWhilst from "./doWhilst";
import each from "./each";
import eachLimit from "./eachLimit";
import eachOf from "./eachOf";
import eachOfLimit from "./eachOfLimit";
import eachOfSeries from "./eachOfSeries";
import eachSeries from "./eachSeries";
import ensureAsync from "./ensureAsync";
import every from "./every";
import everyLimit from "./everyLimit";
import everySeries from "./everySeries";
import filter from "./filter";
import filterLimit from "./filterLimit";
import filterSeries from "./filterSeries";
import forever from "./forever";
import groupBy from "./groupBy";
import groupByLimit from "./groupByLimit";
import groupBySeries from "./groupBySeries";
import log from "./log";
import map from "./map";
import mapLimit from "./mapLimit";
import mapSeries from "./mapSeries";
import mapValues from "./mapValues";
import mapValuesLimit from "./mapValuesLimit";
import mapValuesSeries from "./mapValuesSeries";
import memoize from "./memoize";
import nextTick from "./nextTick";
import parallel from "./parallel";
import parallelLimit from "./parallelLimit";
import priorityQueue from "./priorityQueue";
import queue from "./queue";
import race from "./race";
import reduce from "./reduce";
import reduceRight from "./reduceRight";
import reflect from "./reflect";
import reflectAll from "./reflectAll";
import reject from "./reject";
import rejectLimit from "./rejectLimit";
import rejectSeries from "./rejectSeries";
import retry from "./retry";
import retryable from "./retryable";
import seq from "./seq";
import series from "./series";
import setImmediate from "./setImmediate";
import some from "./some";
import someLimit from "./someLimit";
import someSeries from "./someSeries";
import sortBy from "./sortBy";
import timeout from "./timeout";
import times from "./times";
import timesLimit from "./timesLimit";
import timesSeries from "./timesSeries";
import transform from "./transform";
import tryEach from "./tryEach";
import unmemoize from "./unmemoize";
import until from "./until";
import waterfall from "./waterfall";
import whilst from "./whilst";
export { apply, applyEach, applyEachSeries, asyncify, auto, autoInject, cargo, cargoQueue, compose, concat, concatLimit, concatSeries, constant, detect, detectLimit, detectSeries, dir, doUntil, doWhilst, each, eachLimit, eachOf, eachOfLimit, eachOfSeries, eachSeries, ensureAsync, every, everyLimit, everySeries, filter, filterLimit, filterSeries, forever, groupBy, groupByLimit, groupBySeries, log, map, mapLimit, mapSeries, mapValues, mapValuesLimit, mapValuesSeries, memoize, nextTick, parallel, parallelLimit, priorityQueue, queue, race, reduce, reduceRight, reflect, reflectAll, reject, rejectLimit, rejectSeries, retry, retryable, seq, series, setImmediate, some, someLimit, someSeries, sortBy, timeout, times, timesLimit, timesSeries, transform, tryEach, unmemoize, until, waterfall, whilst, every as all, everyLimit as allLimit, everySeries as allSeries, some as any, someLimit as anyLimit, someSeries as anySeries, detect as find, detectLimit as findLimit, detectSeries as findSeries, concat as flatMap, concatLimit as flatMapLimit, concatSeries as flatMapSeries, each as forEach, eachSeries as forEachSeries, eachLimit as forEachLimit, eachOf as forEachOf, eachOfSeries as forEachOfSeries, eachOfLimit as forEachOfLimit, reduce as inject, reduce as foldl, reduceRight as foldr, filter as select, filterLimit as selectLimit, filterSeries as selectSeries, asyncify as wrapSync, whilst as during, doWhilst as doDuring };
