export default function lowercaseKeys(object: object): object {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key.toLowerCase(), value]));
}
