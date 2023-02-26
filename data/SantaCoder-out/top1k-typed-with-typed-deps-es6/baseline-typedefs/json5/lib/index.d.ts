import parse from './parse';
import stringify from './stringify';
declare const JSON5: {
    parse: typeof parse;
    stringify: typeof stringify;
};
export default JSON5;
