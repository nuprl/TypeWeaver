
var request: any = require('request'),
    fs = require('fs'),
    path = require('path'),
    errTo = require('errto');

// Common utilities used in scripts.

exports.getFile = function(url: string, cb: any) {
    var sourceDataFolder: any = path.join(__dirname, "source-data");
    var fullpath: any = path.join(sourceDataFolder, path.basename(url));
    fs.readFile(fullpath, "utf8", function(err: any, text: any) {
        if (!err) return cb(null, text);
        if (err.code != "ENOENT") return cb(err);
        request(url, errTo(cb, function(res: any, buf: any) {
            fs.mkdir(sourceDataFolder, function(err: any) {
                if (err && err.code != "EEXIST") return cb(err);
                fs.writeFile(fullpath, buf, errTo(cb, function() {
                    cb(null, buf.toString());
                }));
            });
        }));
    });
}

// Returns array of arrays.
exports.parseText = function(text: string, splitChar: any) {
    return text.split("\n").map(function(line: string) {
        return line.split("#")[0].trim(); 
    }).filter(Boolean).map(function(line: string) {
        return line.split(splitChar || /\s+/).map(function(s: string) {return s.trim()}).filter(Boolean);
    });
} 

// Convert array of character codes to string. Character codes can be > 0xFFFF,
// so we emit surrogates when needed. Also, some character codes are actually
// sequences (arrays) - we emit them prepended with U+0FFF-(length-2).
// U+0FFF was chosen because it's small and unassigned, as well as 32 chars before it
function arrToStr(arr: any): any {
    var s: string = '';
    for (var i = 0; i < arr.length; i++)
        if (Array.isArray(arr[i])) {
            if (arr[i].length == 1)
                s += arrToStr(arr[i]);
            else if (arr[i].length > 1)
                s += String.fromCharCode(0xFFF - (arr[i].length-2)) 
                    + arrToStr(arr[i]);
        
        } else if (arr[i] > 0xFFFF) {
            // Surrogates
            s += String.fromCharCode(0xD800 + Math.floor((arr[i] - 0x10000) / 0x400))
               + String.fromCharCode(0xDC00 + (arr[i] - 0x10000) % 0x400);

        } else {
            // Basic characters.
            s += String.fromCharCode(arr[i]);
        }    
        
    return s;
}

// Input: map <dbcs num> -> <unicode num>
// Resulting format: Array of chunks, each chunk is:
// [0] = address of start of the chunk, hex string.
// <str> - characters of the chunk.
// <num> - increasing sequence of the length num, starting with prev character.
exports.generateTable = function(dbcs: any, maxBytes: any) {
    var minSeqLen: number = 4;
    var table: any[] = [], range, block, seqLen;
    var max: number = 1 << ((maxBytes || 2) * 8);
    for (var i = 0x0000; i < max; i++)
        if (dbcs[i] !== undefined) {
            if (dbcs[i-1] === undefined) { // Range started.
                range = [i.toString(16)]; // Range[0] is starting address.
                block = []; // Current block of character codes.
                seqLen = 0; // Increasing sequence length at the end of the block.
            }
            else if (typeof dbcs[i-1] === 'number' &&  // We have arrays as elements of dbcs - check against it.
                     typeof dbcs[i] === 'number' &&
                     dbcs[i-1] + 1 === dbcs[i]) { // Increasing sequence continues - track its length.
                seqLen++;
            }
            else { // Increasing sequence ended (or not started at all).
                if (seqLen >= minSeqLen) {
                    // Seq is long enough: write prev segment and its length.
                    range.push(arrToStr(block.slice(0, -seqLen)), seqLen);
                    block = [];
                }
                seqLen = 0;
            }

            block.push(dbcs[i]);

        } else if (range) { // Range finished, write last segments.
            if (seqLen >= minSeqLen)
                range.push(arrToStr(block.slice(0, -seqLen)), seqLen);
            else
                range.push(arrToStr(block));

            table.push(range);
            range = null;
        }

    return table;
}


exports.writeTable = function(name: string, table: any) {
    this.writeFile(name, "[\n" + table.map(function(a: any) {return JSON.stringify(a);}).join(",\n") + "\n]\n");
}

exports.writeFile = function(name: string, body: any) {
    fs.writeFileSync(path.join(__dirname, "../encodings/tables", name + ".json"), body);
}

