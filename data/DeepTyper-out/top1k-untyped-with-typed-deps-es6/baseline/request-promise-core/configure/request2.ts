'use strict';

import core from '../';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isObjectLike from 'lodash/isObjectLike';


export default function (options): any {

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


    var plumbing: any = core({
        PromiseImpl: options.PromiseImpl,
        constructorMixin: options.constructorMixin
    });


    // Intercepting Request's init method

    var originalInit: any = options.request.Request.prototype.init;

    options.request.Request.prototype.init = function RP$initInterceptor(requestOptions: any) {

        // Init may be called again - currently in case of redirects
        if (isObjectLike(requestOptions) && !this._callback && !this._rp_promise) {

            plumbing.init.call(this, requestOptions);

        }

        return originalInit.apply(this, arguments);

    };


    // Exposing the Promise capabilities

    var thenExposed: boolean = false;
    for ( var i = 0; i < options.expose.length; i+=1 ) {

        var method: any = options.expose[i];

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
