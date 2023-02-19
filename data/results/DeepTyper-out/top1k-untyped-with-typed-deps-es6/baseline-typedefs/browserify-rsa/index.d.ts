declare function crt(msg: string, priv: any): any;
declare namespace crt {
    var getr: (priv: any) => any;
}
export default crt;
