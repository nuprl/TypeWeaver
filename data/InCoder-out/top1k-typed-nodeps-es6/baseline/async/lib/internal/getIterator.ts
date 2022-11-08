export default function (coll: Collection) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
}