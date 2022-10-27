import { constants } from 'os'

import { SIGRTMAX } from './realtime.js'
import { getSignals } from './signals.js'

// Retrieve `signalsByName`, an object mapping signal name to signal properties.
// We make sure the object is sorted by `number`.
const getSignalsByName: Function = function () {
  const signals: Array = getSignals()
  return Object.fromEntries(signals.map(getSignalByName))
}

const getSignalByName: Function = function ({
  name,
  number,
  description,
  supported,
  action,
  forced,
  standard,
}) {
  return [
    name,
    { name, number, description, supported, action, forced, standard },
  ]
}

export const signalsByName: String = getSignalsByName()

// Retrieve `signalsByNumber`, an object mapping signal number to signal
// properties.
// We make sure the object is sorted by `number`.
const getSignalsByNumber: Function = function () {
  const signals: String = getSignals()
  const length: String = SIGRTMAX + 1
  const signalsA: Array = Array.from({ length }, (value: Number, number: Number) =>
    getSignalByNumber(number, signals),
  )
  return Object.assign({}, ...signalsA)
}

const getSignalByNumber: Function = function (number: String, signals: Array) {
  const signal: Object = findSignalByNumber(number, signals)

  if (signal === undefined) {
    return {}
  }

  const { name, description, supported, action, forced, standard } = signal
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard,
    },
  }
}

// Several signals might end up sharing the same number because of OS-specific
// numbers, in which case those prevail.
const findSignalByNumber: Function = function (number: Number, signals: Array) {
  const signal: String = signals.find(({ name }) => constants.signals[name] === number)

  if (signal !== undefined) {
    return signal
  }

  return signals.find((signalA: Object) => signalA.number === number)
}

export const signalsByNumber: Number = getSignalsByNumber()
