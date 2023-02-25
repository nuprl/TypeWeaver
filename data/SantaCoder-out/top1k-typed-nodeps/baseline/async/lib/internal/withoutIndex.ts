export default function _withoutIndex(iteratee: any) {
    return (value, index, callback) => iteratee(value, callback);
}