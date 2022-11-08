export default function range(size: number) {
    var result = Array(size);
    while (size--) {
        result[size] = size;
    }
    return result;
}