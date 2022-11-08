export default function _withoutIndex(iteratee: Function) {
    return (value, index, callback) => iteratee(value, callback);
}