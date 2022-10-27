// List of realtime signals with information about them
export const getRealtimeSignals: Function = function () {
  const length: String = SIGRTMAX - SIGRTMIN + 1
  return Array.from({ length }, getRealtimeSignal)
}

const getRealtimeSignal: Function = function (value: Number, index: String) {
  return {
    name: `SIGRT${index + 1}`,
    number: SIGRTMIN + index,
    action: 'terminate',
    description: 'Application-specific signal (realtime)',
    standard: 'posix',
  }
}

const SIGRTMIN: Number = 34
export const SIGRTMAX: Number = 64
