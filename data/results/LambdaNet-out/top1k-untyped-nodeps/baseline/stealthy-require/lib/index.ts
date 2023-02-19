'use strict';

var isNative: RegExp = /\.node$/;

function forEach(obj: any[], callback: Function): void {
    for ( var key in obj ) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        callback(key);
    }
}

function assign(target: object, source: object): object {
    forEach(source, function (key: string) {
        target[key] = source[key];
    });
    return target;
}

function clearCache(requireCache: object): void {
    forEach(requireCache, function (resolvedPath: string) {
        if (!isNative.test(resolvedPath)) {
            delete requireCache[resolvedPath];
        }
    });
}

module.exports = function (requireCache: object, callback: Function, callbackForModulesToKeep: object, module: Function) {

    var originalCache: object = assign({}, requireCache);
    clearCache(requireCache);

    if (callbackForModulesToKeep) {

        var originalModuleChildren: object = module.children ? module.children.slice() : false; // Creates a shallow copy of module.children

        callbackForModulesToKeep();

        // Lists the cache entries made by callbackForModulesToKeep()
        var modulesToKeep: any[] = [];
        forEach(requireCache, function (key: string) {
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

    var freshModule: boolean = callback();

    var stealthCache: object = callbackForModulesToKeep ? assign({}, requireCache) : false;

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
