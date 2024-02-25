declare const _exports: {
    shiftjis: {
        type: string;
        table: () => any;
        encodeAdd: {
            '\u00A5': number;
            '\u203E': number;
        };
        encodeSkipVals: {
            from: number;
            to: number;
        }[];
    };
    csshiftjis: string;
    mskanji: string;
    sjis: string;
    windows31j: string;
    ms31j: string;
    xsjis: string;
    windows932: string;
    ms932: string;
    '932': string;
    cp932: string;
    eucjp: {
        type: string;
        table: () => any;
        encodeAdd: {
            '\u00A5': number;
            '\u203E': number;
        };
    };
    gb2312: string;
    gb231280: string;
    gb23121980: string;
    csgb2312: string;
    csiso58gb231280: string;
    euccn: string;
    windows936: string;
    ms936: string;
    '936': string;
    cp936: {
        type: string;
        table: () => any;
    };
    gbk: {
        type: string;
        table: () => any;
    };
    xgbk: string;
    isoir58: string;
    gb18030: {
        type: string;
        table: () => any;
        gb18030: () => any;
        encodeSkipVals: number[];
        encodeAdd: {
            '\u20AC': number;
        };
    };
    chinese: string;
    windows949: string;
    ms949: string;
    '949': string;
    cp949: {
        type: string;
        table: () => any;
    };
    cseuckr: string;
    csksc56011987: string;
    euckr: string;
    isoir149: string;
    korean: string;
    ksc56011987: string;
    ksc56011989: string;
    ksc5601: string;
    windows950: string;
    ms950: string;
    '950': string;
    cp950: {
        type: string;
        table: () => any;
    };
    big5: string;
    big5hkscs: {
        type: string;
        table: () => any;
        encodeSkipVals: number[];
    };
    cnbig5: string;
    csbig5: string;
    xxbig5: string;
};
export = _exports;
