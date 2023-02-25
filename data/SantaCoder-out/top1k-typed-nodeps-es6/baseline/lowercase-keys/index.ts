export default function lowercaseKeys(object: any) {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key.toLowerCase(), value]));
}