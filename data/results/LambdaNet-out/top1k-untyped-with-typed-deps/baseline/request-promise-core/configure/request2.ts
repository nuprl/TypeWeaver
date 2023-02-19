'use strict';

var core: Function = require('../'),
    isArray: Function = require('lodash/isArray'),
    isFunction: Function = require('lodash/isFunction'),
    isObjectLike: Function = require('lodash/isObjectLike');


module.exports = function (options: object) {

    var errorText: string = 'Please verify options'; // For better minification because this string is repeating

    if (!isObjectLike(options)) {
        throw new TypeError(errorText);
    }

    if (!isFunction(options.request)) {
        throw new TypeError(errorText + '.request');
    }

    if (!isArray(options.expose) || options.expose.length === 0) {
        throw new TypeError(errorText + '.expose');
    }


    var plumbing: object = core({
        PromiseImpl: options.PromiseImpl,
        constructorMixin: options.constructorMixin
    });


    // Intercepting Request's init method

    var originalInit: Function = options.request.Request.prototype.init;

    options.request.Request.prototype.init = function RP$initInterceptor(requestOptions: string): Promise {

        // Init may be called again - currently in case of redirects
        if (isObjectLike(requestOptions) && !this._callback && !this._rp_promise) {

            plumbing.init.call(this, requestOptions);

        }

        return originalInit.apply(this, arguments);

    };


    // Exposing the Promise capabilities

    var thenExposed: boolean = false;
    for ( var i = 0; i < options.expose.length; i+=1 ) {

        var method: string = options.expose[i];

        plumbing[ method === 'promise' ? 'exposePromise' : 'exposePromiseMethod' ](
            options.request.Request.prototype,
            null,
            '_rp_promise',
            method
        );

        if (method === 'then') {
            thenExposed = true;
        }

    }

    if (!thenExposed) {
        throw new Error('Please expose "then"');
    }

};
