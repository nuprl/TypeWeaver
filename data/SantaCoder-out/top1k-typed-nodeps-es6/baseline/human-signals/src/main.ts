import { constants } from 'os'

import { SIGRTMAX } from './realtime.js'
import { getSignals } from './signals.js'

// Retrieve `signalsByName`, an object mapping signal name to signal properties.
// We make sure the object is sorted by `number`.
const getSignalsByName = function () {
  const signals = getSignals()
  return Object.fromEntries(signals.map(getSignalByName))
}

const getSignalByName = function ({
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

export const signalsByName = getSignalsByName()

// Retrieve `signalsByNumber`, an object mapping signal number to signal
// properties.
// We make sure the object is sorted by `number`.
const getSignalsByNumber = function () {
  const signals = getSignals()
  const length = SIGRTMAX + 1
  const signalsA = Array.from({ length }, (value, number) =>
    getSignalByNumber(number, signals),
  )
  return Object.assign({}, ...signalsA)
}

const getSignalByNumber = function (number: number, signals: Signal[]) {
  const signal = findSignalByNumber(number, signals)

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
const findSignalByNumber = function (number: number, signals: number[]) {
  const signal = signals.find(({ name }) => constants.signals[name] === number)

  if (signal !== undefined) {
    return signal
  }

  return signals.find((signalA) => signalA.number === number)
}

export const signalsByNumber = getSignalsByNumber()