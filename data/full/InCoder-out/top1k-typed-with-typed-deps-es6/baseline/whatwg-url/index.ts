"use strict";

import { URL, URLSearchParams } from './webidl2js-wrapper';
import urlStateMachine from './lib/url-state-machine';
import percentEncoding from './lib/percent-encoding';

const sharedGlobalObject = { Array, Object, Promise, String, TypeError };
URL.install(sharedGlobalObject, ["Window"]);
URLSearchParams.install(sharedGlobalObject, ["Window"]);

export const URL = sharedGlobalObject.URL;
export const URLSearchParams = sharedGlobalObject.URLSearchParams;
export const parseURL = urlStateMachine.parseURL;
export const basicURLParse = urlStateMachine.basicURLParse;
export const serializeURL = urlStateMachine.serializeURL;
export const serializePath = urlStateMachine.serializePath;
export const serializeHost = urlStateMachine.serializeHost;
export const serializeInteger = urlStateMachine.serializeInteger;
export const serializeURLOrigin = urlStateMachine.serializeURLOrigin;
export const setTheUsername = urlStateMachine.setTheUsername;
export const setThePassword = urlStateMachine.setThePassword;
export const cannotHaveAUsernamePasswordPort = urlStateMachine.cannotHaveAUsernamePasswordPort;
export const hasAnOpaquePath = urlStateMachine.hasAnOpaquePath;
export const percentDecodeString = percentEncoding.percentDecodeString;
export const percentDecodeBytes = percentEncoding.percentDecodeBytes;