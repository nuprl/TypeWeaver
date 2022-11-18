// List of realtime signals with information about them
export const getRealtimeSignals: Function = function () {
  const length: string = SIGRTMAX - SIGRTMIN + 1
  return Array.from({ length }, getRealtimeSignal)
}

const getRealtimeSignal: Function = function (value: number, index: string) {
  return {
    name: `SIGRT${index + 1}`,
    number: SIGRTMIN + index,
    action: 'terminate',
    description: 'Application-specific signal (realtime)',
    standard: 'posix',
  }
}

const SIGRTMIN: number = 34
export const SIGRTMAX: number = 64
