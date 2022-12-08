import EventSource from './eventsource';

if (typeof window === 'object') {
  window.EventSourcePolyfill = EventSource
  if (!window.EventSource) window.EventSource = EventSource
  export default window.EventSource;
} else {
  export default EventSource;
}