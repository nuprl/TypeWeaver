export default function isObject(value: string): boolean {
	const type: string = typeof value;
	return value !== null && (type === 'object' || type === 'function');
}
