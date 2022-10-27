import baseIsMatch from './baseIsMatch.js'
import getMatchData from './getMatchData.js'
import matchesStrictComparable from './matchesStrictComparable.js'

/**
 * The base implementation of `matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source: String): Function {
  const matchData: Array = getMatchData(source)
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1])
  }
  return (object: Array) => object === source || baseIsMatch(object, source, matchData)
}

export default baseMatches
