export default function arrayUniq(array: Object): Array {
	return [...new Set(array)];
}
