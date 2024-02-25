export default truncate;
declare function truncate(string?: string, options?: {
    length?: number;
    omission?: string;
    separator?: RegExp | string;
}): string;
