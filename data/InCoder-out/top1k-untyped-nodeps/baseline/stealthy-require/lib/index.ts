'use strict';

var isNative = /\.node$/;

function forEach(obj: Object,  callback: Function) {
    for ( var key in obj ) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        callback(key);
    }
}

function assign(target: any,  source: any) {
    forEach(source, function (key: any) {
        target[key] = source[key];
    });
    return target;
}

function clearCache(requireCache: boolean) {
    forEach(requireCache, function (resolvedPath: ResolvedPath) {
        if (!isNative.test(resolvedPath)) {
            delete requireCache[resolvedPath];
        }
    });
}

module.exports = function (requireCache: any,  callback: Function,  callbackForModulesToKeep: Function,  module: Module) {

    var originalCache = assign({}, requireCache);
    clearCache(requireCache);

    if (callbackForModulesToKeep) {

        var originalModuleChildren = module.children ? module.children.slice() : false; // Creates a shallow copy of module.children

        callbackForModulesToKeep();

        // Lists the cache entries made by callbackForModulesToKeep()
        var modulesToKeep = [];
        forEach(requireCache, function (key: string | symbol) {
            modulesToKeep.push(key);
        });

        // Discards the modules required in callbackForModulesToKeep()
        clearCache(requireCache);

        if (module.children) { // Only true for node.js
            module.children = originalModuleChildren; // Removes last references to modules required in callbackForModulesToKeep() -> No memory leak
        }

        // Takes the cache entries of the original cache in case the modules where required before
        for ( var i = 0; i < modulesToKeep.length; i+=1 ) {
            if (originalCache[modulesToKeep[i]]) {
                requireCache[modulesToKeep[i]] = originalCache[modulesToKeep[i]];
            }
        }

    }

    var freshModule = callback();

    var stealthCache = callbackForModulesToKeep ? assign({}, requireCache) : false;

    clearCache(requireCache);

    if (callbackForModulesToKeep) {
        // In case modules to keep were required inside the stealthy require for the first time, copy them to the restored cache
        for ( var k = 0; k < modulesToKeep.length; k+=1 ) {
            if (stealthCache[modulesToKeep[k]]) {
                requireCache[modulesToKeep[k]] = stealthCache[modulesToKeep[k]];
            }
        }
    }

    assign(requireCache, originalCache);

    return freshModule;

};