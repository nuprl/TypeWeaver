/** 
 * JSON Schema link handler
 * Licensed under AFL-2.1 OR BSD-3-Clause
 */
(function (root: any, factory: any) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return factory();
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        export default factory();
    } else {
        // Browser globals
        root.jsonSchemaLinks = factory();
    }
}(this, function () {
    // setup primitive classes to be JSON Schema types
    var exports: {} = {};
    export const cacheLinks: boolean = true;

    export const getLink: void = function(relation: any, instance: any, schema: any){
        // gets the URI of the link for the given relation based on the instance and schema
        // for example:
        // getLink(
        // 		"brother", 
        // 		{"brother_id":33}, 
        // 		{links:[{rel:"brother", href:"Brother/{brother_id}"}]}) ->
        //	"Brother/33"
        var links: any = schema.__linkTemplates; 
        if(!links){
            links = {};
            var schemaLinks: any = schema.links;
            if(schemaLinks && schemaLinks instanceof Array){
                schemaLinks.forEach(function(link: any){
        /*			// TODO: allow for multiple same-name relations
                    if(links[link.rel]){
                        if(!(links[link.rel] instanceof Array)){
                            links[link.rel] = [links[link.rel]];
                        }
                    }*/
                    links[link.rel] = link.href;
                });
            }
            if(exports.cacheLinks){
                schema.__linkTemplates = links;
            }
        }
        var linkTemplate: any = links[relation];
        return linkTemplate && substitute(linkTemplate, instance);
    };

    export const substitute: any = function(linkTemplate: any, instance: any){
        return linkTemplate.replace(/\{([^\}]*)\}/g, function(t: any, property: string){
                var value: any = instance[decodeURIComponent(property)];
                if(value instanceof Array){
                    // the value is an array, it should produce a URI like /Table/(4,5,8) and store.get() should handle that as an array of values
                    return '(' + value.join(',') + ')';
                }
                return value;
            });
    };

    return exports;
}));