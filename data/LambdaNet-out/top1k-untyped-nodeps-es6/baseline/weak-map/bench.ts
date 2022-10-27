
import WeakMap from './weak-map';

var keys: Array = [];
for (var i = 0; i < 1000; i++) {
    keys.push({});
}
var maps: Array = [];

suite("WeakMap", function () {
    bench("make", function () {
        for (var i = 0; i < 100; i++) {
            maps.push(new WeakMap());
        }
    });
    bench("set", function () {
        var map: Map = maps[0];
        for (var i = 0; i < keys.length; i++) {
            map.set(keys[i], i);
        }
    });
    bench("get", function () {
        var map: HTMLElement = maps[0];
        for (var i = 0; i < keys.length; i++) {
            map.get(keys[i]);
        }
    });
    bench("sparse set", function () {
        for (var j = 25; j < maps.length; j += 12) {
            for (var i = 0; i < 10; i++) {
                maps[j].set(keys[i], i);
            }
        }
    });
    bench("sparse get", function () {
        for (var j = 25; j < maps.length; j += 12) {
            for (var i = 0; i < 10; i++) {
                maps[j].get(keys[i]);
            }
        }
    });
});

