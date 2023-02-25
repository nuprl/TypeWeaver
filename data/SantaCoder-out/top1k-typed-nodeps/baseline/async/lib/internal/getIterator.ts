export default function (coll: any) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
}