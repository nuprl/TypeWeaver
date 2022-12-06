export default function arrayUniq(array: object): any[] {
	return [...new Set(array)];
}
