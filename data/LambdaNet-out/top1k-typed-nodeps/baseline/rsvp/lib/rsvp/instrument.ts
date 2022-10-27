import { config } from './config';

const queue: Array = [];

function scheduleFlush(): Void {
  setTimeout(() => {
    for (let i = 0; i < queue.length; i++) {
      let entry: Object = queue[i];

      let payload: Object = entry.payload;

      payload.guid = payload.key + payload.id;
      payload.childGuid = payload.key + payload.childId;
      if (payload.error) {
        payload.stack = payload.error.stack;
      }

      config['trigger'](entry.name, entry.payload);
    }
    queue.length = 0;
  }, 50);
}

export default function instrument(eventName: String, promise: String, child: Map): Void {
  if (1 === queue.push({
    name: eventName,
    payload: {
      key: promise._guidKey,
      id:  promise._id,
      eventName: eventName,
      detail: promise._result,
      childId: child && child._id,
      label: promise._label,
      timeStamp: Date.now(),
      error: config["instrument-with-stack"] ? new Error(promise._label) : null
    }})) {
      scheduleFlush();
    }
  }
