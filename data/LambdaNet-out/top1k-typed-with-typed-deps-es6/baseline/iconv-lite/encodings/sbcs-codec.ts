"use strict";
import { Buffer } from 'safer-buffer';

// Single-byte codec. Needs a 'chars' string parameter that contains 256 or 128 chars that
// correspond to encoded bytes (if 128 - then lower half is ASCII). 

export const _sbcs: Function = SBCSCodec;

function SBCSCodec(codecOptions: object, iconv: object): Void {
    if (!codecOptions)
        throw new Error("SBCS codec is called without the data.")
    
    // Prepare char buffer for decoding.
    if (!codecOptions.chars || (codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256))
        throw new Error("Encoding '"+codecOptions.type+"' has incorrect 'chars' (must be of len 128 or 256)");
    
    if (codecOptions.chars.length === 128) {
        var asciiString: string = "";
        for (var i = 0; i < 128; i++)
            asciiString += String.fromCharCode(i);
        codecOptions.chars = asciiString + codecOptions.chars;
    }

    this.decodeBuf = Buffer.from(codecOptions.chars, 'ucs2');
    
    // Encoding buffer.
    var encodeBuf: object = Buffer.alloc(65536, iconv.defaultCharSingleByte.charCodeAt(0));

    for (var i = 0; i < codecOptions.chars.length; i++)
        encodeBuf[codecOptions.chars.charCodeAt(i)] = i;

    this.encodeBuf = encodeBuf;
}

SBCSCodec.prototype.encoder = SBCSEncoder;
SBCSCodec.prototype.decoder = SBCSDecoder;


function SBCSEncoder(options: object, codec: object): Void {
    this.encodeBuf = codec.encodeBuf;
}

SBCSEncoder.prototype.write = function(str: string) {
    var buf: object = Buffer.alloc(str.length);
    for (var i = 0; i < str.length; i++)
        buf[i] = this.encodeBuf[str.charCodeAt(i)];
    
    return buf;
}

SBCSEncoder.prototype.end = function() {
}


function SBCSDecoder(options: object, codec: object): Void {
    this.decodeBuf = codec.decodeBuf;
}

SBCSDecoder.prototype.write = function(buf: any[]) {
    // Strings are immutable in JS -> we use ucs2 buffer to speed up computations.
    var decodeBuf: object = this.decodeBuf;
    var newBuf: any[] = Buffer.alloc(buf.length*2);
    var idx1: number = 0, idx2: number = 0;
    for (var i = 0; i < buf.length; i++) {
        idx1 = buf[i]*2; idx2 = i*2;
        newBuf[idx2] = decodeBuf[idx1];
        newBuf[idx2+1] = decodeBuf[idx1+1];
    }
    return newBuf.toString('ucs2');
}

SBCSDecoder.prototype.end = function() {
}
