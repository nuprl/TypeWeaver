'use strict';

var errors: Object = require('./errors.js'),
    isFunction: Function = require('lodash/isFunction'),
    isObjectLike: Function = require('lodash/isObjectLike'),
    isString: Function = require('lodash/isString'),
    isUndefined: Function = require('lodash/isUndefined');


module.exports = function (options: Object) {

    var errorText: String = 'Please verify options'; // For better minification because this string is repeating

    if (!isObjectLike(options)) {
        throw new TypeError(errorText);
    }

    if (!isFunction(options.PromiseImpl)) {
        throw new TypeError(errorText + '.PromiseImpl');
    }

    if (!isUndefined(options.constructorMixin) && !isFunction(options.constructorMixin)) {
        throw new TypeError(errorText + '.PromiseImpl');
    }

    var PromiseImpl: Object = options.PromiseImpl;
    var constructorMixin: Function = options.constructorMixin;


    var plumbing: HTMLElement = {};

    plumbing.init = function (requestOptions: ChildProcess) {

        var self: HTMLElement = this;

        self._rp_promise = new PromiseImpl(function (resolve: String, reject: Array) {
            self._rp_resolve = resolve;
            self._rp_reject = reject;
            if (constructorMixin) {
                constructorMixin.apply(self, arguments); // Using arguments since specific Promise libraries may pass additional parameters
            }
        });

        self._rp_callbackOrig = requestOptions.callback;
        requestOptions.callback = self.callback = function RP$callback(err: Function, response: Object, body: String): Void {
            plumbing.callback.call(self, err, response, body);
        };

        if (isString(requestOptions.method)) {
            requestOptions.method = requestOptions.method.toUpperCase();
        }

        requestOptions.transform = requestOptions.transform || plumbing.defaultTransformations[requestOptions.method];

        self._rp_options = requestOptions;
        self._rp_options.simple = requestOptions.simple !== false;
        self._rp_options.resolveWithFullResponse = requestOptions.resolveWithFullResponse === true;
        self._rp_options.transform2xxOnly = requestOptions.transform2xxOnly === true;

    };

    plumbing.defaultTransformations = {
        HEAD: function (body: Function, response: ChildProcess, resolveWithFullResponse: Boolean) {
            return resolveWithFullResponse ? response : response.headers;
        }
    };

    plumbing.callback = function (err: Boolean, response: HTMLElement, body: Function) {

        var self: HTMLElement = this;

        var origCallbackThrewException: Boolean = false, thrownException: Array = null;

        if (isFunction(self._rp_callbackOrig)) {
            try {
                self._rp_callbackOrig.apply(self, arguments); // TODO: Apply to self mimics behavior of request@2. Is that also right for request@next?
            } catch (e) {
                origCallbackThrewException = true;
                thrownException = e;
            }
        }

        var is2xx: Boolean = !err && /^2/.test('' + response.statusCode);

        if (err) {

            self._rp_reject(new errors.RequestError(err, self._rp_options, response));

        } else if (self._rp_options.simple && !is2xx) {

            if (isFunction(self._rp_options.transform) && self._rp_options.transform2xxOnly === false) {

                (new PromiseImpl(function (resolve: Function) {
                    resolve(self._rp_options.transform(body, response, self._rp_options.resolveWithFullResponse)); // transform may return a Promise
                }))
                    .then(function (transformedResponse: Object) {
                        self._rp_reject(new errors.StatusCodeError(response.statusCode, body, self._rp_options, transformedResponse));
                    })
                    .catch(function (transformErr: Boolean) {
                        self._rp_reject(new errors.TransformError(transformErr, self._rp_options, response));
                    });

            } else {
                self._rp_reject(new errors.StatusCodeError(response.statusCode, body, self._rp_options, response));
            }

        } else {

            if (isFunction(self._rp_options.transform) && (is2xx || self._rp_options.transform2xxOnly === false)) {

                (new PromiseImpl(function (resolve: Function) {
                    resolve(self._rp_options.transform(body, response, self._rp_options.resolveWithFullResponse)); // transform may return a Promise
                }))
                    .then(function (transformedResponse: Object) {
                        self._rp_resolve(transformedResponse);
                    })
                    .catch(function (transformErr: Boolean) {
                        self._rp_reject(new errors.TransformError(transformErr, self._rp_options, response));
                    });

            } else if (self._rp_options.resolveWithFullResponse) {
                self._rp_resolve(response);
            } else {
                self._rp_resolve(body);
            }

        }

        if (origCallbackThrewException) {
            throw thrownException;
        }

    };

    plumbing.exposePromiseMethod = function (exposeTo: Object, bindTo: Array, promisePropertyKey: String, methodToExpose: String, exposeAs: String) {

        exposeAs = exposeAs || methodToExpose;

        if (exposeAs in exposeTo) {
            throw new Error('Unable to expose method "' + exposeAs + '"');
        }

        exposeTo[exposeAs] = function RP$exposed(): Promise {
            var self: Object = bindTo || this;
            return self[promisePropertyKey][methodToExpose].apply(self[promisePropertyKey], arguments);
        };

    };

    plumbing.exposePromise = function (exposeTo: Object, bindTo: Array, promisePropertyKey: String, exposeAs: String) {

        exposeAs = exposeAs || 'promise';

        if (exposeAs in exposeTo) {
            throw new Error('Unable to expose method "' + exposeAs + '"');
        }

        exposeTo[exposeAs] = function RP$promise(): Object {
            var self: Object = bindTo || this;
            return self[promisePropertyKey];
        };

    };

    return plumbing;

};
