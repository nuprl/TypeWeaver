export default function _withoutIndex(iteratee: Iteratee<T>) {
    return (value, index, callback) => iteratee(value, callback);
}