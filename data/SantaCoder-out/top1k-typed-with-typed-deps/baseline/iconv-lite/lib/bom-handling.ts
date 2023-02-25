"use strict";

var BOMChar = '\uFEFF';

exports.PrependBOM = PrependBOMWrapper
function PrependBOMWrapper(encoder: EncodingEncoder, options: IEncodingOptions) {
    this.encoder = encoder;
    this.addBOM = true;
}

PrependBOMWrapper.prototype.write = function(str: string) {
    if (this.addBOM) {
        str = BOMChar + str;
        this.addBOM = false;
    }

    return this.encoder.write(str);
}

PrependBOMWrapper.prototype.end = function() {
    return this.encoder.end();
}


//------------------------------------------------------------------------------

exports.StripBOM = StripBOMWrapper;
function StripBOMWrapper(decoder: Decoder, options: Options) {
    this.decoder = decoder;
    this.pass = false;
    this.options = options || {};
}

StripBOMWrapper.prototype.write = function(buf: Uint8Array) {
    var res = this.decoder.write(buf);
    if (this.pass || !res)
        return res;

    if (res[0] === BOMChar) {
        res = res.slice(1);
        if (typeof this.options.stripBOM === 'function')
            this.options.stripBOM();
    }

    this.pass = true;
    return res;
}

StripBOMWrapper.prototype.end = function() {
    return this.decoder.end();
}
