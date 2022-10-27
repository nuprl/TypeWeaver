export default function lowercaseKeys(object: Object): Object {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key.toLowerCase(), value]));
}
