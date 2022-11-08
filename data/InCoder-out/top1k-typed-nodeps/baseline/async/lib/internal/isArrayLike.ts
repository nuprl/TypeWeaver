export default function isArrayLike(value: any) {
    return value &&
        typeof value.length === 'number' &&
        value.length >= 0 &&
        value.length % 1 === 0;
}