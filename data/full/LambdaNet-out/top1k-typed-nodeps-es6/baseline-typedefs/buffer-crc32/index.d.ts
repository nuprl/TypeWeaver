declare function crc32(): string;
declare namespace crc32 {
    var signed: () => any;
    var unsigned: () => number;
}
export default crc32;
