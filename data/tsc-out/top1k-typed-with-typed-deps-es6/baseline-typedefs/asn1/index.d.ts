declare namespace _default {
    export { Ber };
    export const BerReader: typeof import("./ber/reader").default;
    export const BerWriter: typeof import("./ber/writer").default;
}
export default _default;
import Ber from "./ber/index";
