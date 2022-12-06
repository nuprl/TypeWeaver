// List of realtime signals with information about them
export const getRealtimeSignals: any = function () {
  const length: number = SIGRTMAX - SIGRTMIN + 1
  return Array.from({ length }, getRealtimeSignal)
}

const getRealtimeSignal: any = function (value: any, index: number) {
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
