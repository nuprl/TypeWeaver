import { config } from './config';
import instrument from './instrument';
import {
  noop,
  subscribe,
  FULFILLED,
  REJECTED,
  PENDING,
  invokeCallback
} from './-internal';

export default function then(onFulfillment: Number, onRejection: Number, label: String): String {
  let parent: Promise = this;
  let state: String = parent._state;

  if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
    config.instrument && instrument('chained', parent, parent);
    return parent;
  }

  parent._onError = null;

  let child: Object = new parent.constructor(noop, label);
  let result: Function = parent._result;

  config.instrument && instrument('chained', parent, child);

  if (state === PENDING) {
    subscribe(parent, child, onFulfillment, onRejection);
  } else {
    let callback: Number = state === FULFILLED ? onFulfillment : onRejection;
    config.async(() => invokeCallback(state, child, callback, result));
  }

  return child;
}
