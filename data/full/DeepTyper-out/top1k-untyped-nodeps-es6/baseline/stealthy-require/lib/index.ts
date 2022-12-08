'use strict';

var isNative: string = /\.node$/;

function forEach(obj: any, callback: Function): void {
    for ( var key in obj ) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        callback(key);
    }
}

function assign(target: any, source: any): any {
    forEach(source, function (key: string) {
        target[key] = source[key];
    });
    return target;
}

function clearCache(requireCache: any): void {
    forEach(requireCache, function (resolvedPath: any) {
        if (!isNative.test(resolvedPath)) {
            delete requireCache[resolvedPath];
        }
    });
}

export default function (requireCache: any, callback: any, callbackForModulesToKeep: any, module) {

    var originalCache: any = assign({}, requireCache);
    clearCache(requireCache);

    if (callbackForModulesToKeep) {

        var originalModuleChildren: any = module.children ? module.children.slice() : false; // Creates a shallow copy of module.children

        callbackForModulesToKeep();

        // Lists the cache entries made by callbackForModulesToKeep()
        var modulesToKeep = [];
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

    var freshModule: any = callback();

    var stealthCache: any = callbackForModulesToKeep ? assign({}, requireCache) : false;

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
