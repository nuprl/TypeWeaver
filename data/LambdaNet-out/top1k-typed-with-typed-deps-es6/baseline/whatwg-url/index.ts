"use strict";

import { URL, URLSearchParams } from './webidl2js-wrapper';
import urlStateMachine from './lib/url-state-machine';
import percentEncoding from './lib/percent-encoding';

const sharedGlobalObject: Object = { Array, Object, Promise, String, TypeError };
URL.install(sharedGlobalObject, ["Window"]);
URLSearchParams.install(sharedGlobalObject, ["Window"]);

export const URL: String = sharedGlobalObject.URL;
export const URLSearchParams: Function = sharedGlobalObject.URLSearchParams;
export const parseURL: String = urlStateMachine.parseURL;
export const basicURLParse: String = urlStateMachine.basicURLParse;
export const serializeURL: String = urlStateMachine.serializeURL;
export const serializePath: String = urlStateMachine.serializePath;
export const serializeHost: Function = urlStateMachine.serializeHost;
export const serializeInteger: Function = urlStateMachine.serializeInteger;
export const serializeURLOrigin: String = urlStateMachine.serializeURLOrigin;
export const setTheUsername: String = urlStateMachine.setTheUsername;
export const setThePassword: String = urlStateMachine.setThePassword;
export const cannotHaveAUsernamePasswordPort: Function = urlStateMachine.cannotHaveAUsernamePasswordPort;
export const hasAnOpaquePath: String = urlStateMachine.hasAnOpaquePath;
export const percentDecodeString: Array = percentEncoding.percentDecodeString;
export const percentDecodeBytes: Function = percentEncoding.percentDecodeBytes;
