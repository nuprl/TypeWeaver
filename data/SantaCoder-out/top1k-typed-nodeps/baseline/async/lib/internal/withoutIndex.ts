export default function _withoutIndex(iteratee: Iteratee<any>) {
    return (value, index, callback) => iteratee(value, callback);
}