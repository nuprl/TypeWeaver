export default function arrayUniq(array: any): any[] {
	return [...new Set(array)];
}
