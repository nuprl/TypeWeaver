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

    if (!isFunction(options.client)) {
        throw new TypeError(errorText + '.client');
    }

    if (!isArray(options.expose) || options.expose.length === 0) {
        throw new TypeError(errorText + '.expose');
    }

    var thenExposed: boolean = false;
    for ( var i = 0; i < options.expose.length; i+=1 ) {
        if (options.expose[i] === 'then') {
            thenExposed = true;
            break;
        }
    }
    if (!thenExposed) {
        throw new Error('Please expose "then"');
    }


    var plumbing: object = core({
        PromiseImpl: options.PromiseImpl,
        constructorMixin: options.constructorMixin
    });

    return function (requestOptions: string) {

        var self: Function = {};

        plumbing.init.call(self, requestOptions);

        var request: any[] = options.client(requestOptions);

        for ( var k = 0; k < options.expose.length; k+=1 ) {

            var method: string = options.expose[k];

            plumbing[ method === 'promise' ? 'exposePromise' : 'exposePromiseMethod' ](
                request,
                self,
                '_rp_promise',
                method
            );

        }

        return request;

    };

};
