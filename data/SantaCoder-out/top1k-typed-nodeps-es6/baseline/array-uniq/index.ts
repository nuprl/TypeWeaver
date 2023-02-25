export default function arrayUniq(array: any[]) {
	return [...new Set(array)];
}