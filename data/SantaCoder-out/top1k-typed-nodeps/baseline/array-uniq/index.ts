export default function arrayUniq(array: Array<any>) {
	return [...new Set(array)];
}