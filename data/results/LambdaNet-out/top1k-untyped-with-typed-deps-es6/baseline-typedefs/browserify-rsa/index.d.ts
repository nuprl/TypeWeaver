declare function crt(msg: string, priv: HTMLElement): string;
declare namespace crt {
    var getr: (priv: HTMLElement) => HTMLElement;
}
export default crt;
