export default function isObject(value: String): Boolean {
	const type: String = typeof value;
	return value !== null && (type === 'object' || type === 'function');
}
