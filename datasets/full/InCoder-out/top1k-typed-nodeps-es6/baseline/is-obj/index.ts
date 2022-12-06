export default function isObject(value: unknown) {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
}