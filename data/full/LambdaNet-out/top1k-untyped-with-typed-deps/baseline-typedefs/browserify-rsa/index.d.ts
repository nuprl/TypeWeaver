declare var BN: any[];
declare var randomBytes: Function;
declare function blind(priv: HTMLElement): object;
declare function getr(priv: HTMLElement): HTMLElement;
declare function crt(msg: string, priv: HTMLElement): Promise;
declare namespace crt {
    var getr: typeof globalThis.getr;
}
