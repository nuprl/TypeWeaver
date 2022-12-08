"use strict";

import { URL, URLSearchParams } from './webidl2js-wrapper';
import urlStateMachine from './lib/url-state-machine';
import percentEncoding from './lib/percent-encoding';

const sharedGlobalObject: object = { Array, Object, Promise, String, TypeError };
URL.install(sharedGlobalObject, ["Window"]);
URLSearchParams.install(sharedGlobalObject, ["Window"]);

export const URL: string = sharedGlobalObject.URL;
export const URLSearchParams: Function = sharedGlobalObject.URLSearchParams;
export const parseURL: string = urlStateMachine.parseURL;
export const basicURLParse: string = urlStateMachine.basicURLParse;
export const serializeURL: string = urlStateMachine.serializeURL;
export const serializePath: string = urlStateMachine.serializePath;
export const serializeHost: Function = urlStateMachine.serializeHost;
export const serializeInteger: Function = urlStateMachine.serializeInteger;
export const serializeURLOrigin: string = urlStateMachine.serializeURLOrigin;
export const setTheUsername: string = urlStateMachine.setTheUsername;
export const setThePassword: string = urlStateMachine.setThePassword;
export const cannotHaveAUsernamePasswordPort: Function = urlStateMachine.cannotHaveAUsernamePasswordPort;
export const hasAnOpaquePath: string = urlStateMachine.hasAnOpaquePath;
export const percentDecodeString: any[] = percentEncoding.percentDecodeString;
export const percentDecodeBytes: Function = percentEncoding.percentDecodeBytes;
