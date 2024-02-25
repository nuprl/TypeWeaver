export = crt;
declare function crt(msg: any, priv: any): Buffer;
declare namespace crt {
    export { getr };
}
declare function getr(priv: any): BN;
import BN = require("bn.js");
