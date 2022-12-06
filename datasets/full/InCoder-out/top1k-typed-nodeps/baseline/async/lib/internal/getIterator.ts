export default function (coll: Iterable<number>) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
}