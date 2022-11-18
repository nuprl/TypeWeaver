import { constants } from 'os'

import { SIGRTMAX } from './realtime.js'
import { getSignals } from './signals.js'

// Retrieve `signalsByName`, an object mapping signal name to signal properties.
// We make sure the object is sorted by `number`.
const getSignalsByName: Function = function () {
  const signals: any[] = getSignals()
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

export const signalsByName: string = getSignalsByName()

// Retrieve `signalsByNumber`, an object mapping signal number to signal
// properties.
// We make sure the object is sorted by `number`.
const getSignalsByNumber: Function = function () {
  const signals: string = getSignals()
  const length: string = SIGRTMAX + 1
  const signalsA: any[] = Array.from({ length }, (value: number, number: number) =>
    getSignalByNumber(number, signals),
  )
  return Object.assign({}, ...signalsA)
}

const getSignalByNumber: Function = function (number: string, signals: any[]) {
  const signal: object = findSignalByNumber(number, signals)

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
const findSignalByNumber: Function = function (number: number, signals: any[]) {
  const signal: string = signals.find(({ name }) => constants.signals[name] === number)

  if (signal !== undefined) {
    return signal
  }

  return signals.find((signalA: object) => signalA.number === number)
}

export const signalsByNumber: number = getSignalsByNumber()
