"use strict";

import { Buffer } from 'safer-buffer';

// NOTE: Due to 'stream' module being pretty large (~100Kb, significant in browser environments), 
// we opt to dependency-inject it instead of creating a hard dependency.
export default function(stream_module: stream_module) {
    var Transform = stream_module.Transform;

    // == Encoder stream =======================================================

    function IconvLiteEncoderStream(conv: IconvLite,  options: IconvLiteEncoderOption) {
        this.conv = conv;
        options = options || {};
        options.decodeStrings = false; // We accept only strings, so we don't need to decode them.
        Transform.call(this, options);
    }

    IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
        constructor: { value: IconvLiteEncoderStream }
    });

    IconvLiteEncoderStream.prototype._transform = function(chunk: Buffer,  encoding: string,  done: Function) {
        if (typeof chunk != 'string')
            return done(new Error("Iconv encoding stream needs strings as its input."));
        try {
            var res = this.conv.write(chunk);
            if (res && res.length) this.push(res);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteEncoderStream.prototype._flush = function(done: Function) {
        try {
            var res = this.conv.end();
            if (res && res.length) this.push(res);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteEncoderStream.prototype.collect = function(cb: Function) {
        var chunks = [];
        this.on('error', cb);
        this.on('data', function(chunk: Buffer) { chunks.push(chunk); });
        this.on('end', function() {
            cb(null, Buffer.concat(chunks));
        });
        return this;
    }


    // == Decoder stream =======================================================

    function IconvLiteDecoderStream(conv: IconvLiteDecoder,  options: IconvLiteDecoderOption) {
        this.conv = conv;
        options = options || {};
        options.encoding = this.encoding = 'utf8'; // We output strings.
        Transform.call(this, options);
    }

    IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
        constructor: { value: IconvLiteDecoderStream }
    });

    IconvLiteDecoderStream.prototype._transform = function(chunk: Buffer,  encoding: string,  done: Function) {
        if (!Buffer.isBuffer(chunk) && !(chunk instanceof Uint8Array))
            return done(new Error("Iconv decoding stream needs buffers as its input."));
        try {
            var res = this.conv.write(chunk);
            if (res && res.length) this.push(res, this.encoding);
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteDecoderStream.prototype._flush = function(done: Function) {
        try {
            var res = this.conv.end();
            if (res && res.length) this.push(res, this.encoding);                
            done();
        }
        catch (e) {
            done(e);
        }
    }

    IconvLiteDecoderStream.prototype.collect = function(cb: Function) {
        var res = '';
        this.on('error', cb);
        this.on('data', function(chunk: Buffer) { res += chunk; });
        this.on('end', function() {
            cb(null, res);
        });
        return this;
    }

    return {
        IconvLiteEncoderStream: IconvLiteEncoderStream,
        IconvLiteDecoderStream: IconvLiteDecoderStream,
    };
};