module.exports = process.hrtime || hrtime

// polyfil for window.performance.now
var performance: Performance = global.performance || {}
var performanceNow: number =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() }

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp: number): any{
  var clocktime: number = performanceNow.call(performance)*1e-3
  var seconds: number = Math.floor(clocktime)
  var nanoseconds: number = Math.floor((clocktime%1)*1e9)
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0]
    nanoseconds = nanoseconds - previousTimestamp[1]
    if (nanoseconds<0) {
      seconds--
      nanoseconds += 1e9
    }
  }
  return [seconds,nanoseconds]
}