export default function sortAscending (list: T[]) {
    return list.sort((a, b) => a - b);
};