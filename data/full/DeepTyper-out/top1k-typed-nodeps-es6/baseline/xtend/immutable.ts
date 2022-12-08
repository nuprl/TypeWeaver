export default extend;

var hasOwnProperty: any = Object.prototype.hasOwnProperty;

function extend(): any {
    var target: {} = {}

    for (var i = 0; i < arguments.length; i++) {
        var source: any = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}
