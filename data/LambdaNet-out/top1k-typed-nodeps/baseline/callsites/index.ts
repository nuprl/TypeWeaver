export default function callsites(): any[] {
	const _prepareStackTrace: object = Error.prepareStackTrace;
	Error.prepareStackTrace = (_: Function, stack: string) => stack;
	const stack: any[] = new Error().stack.slice(1); // eslint-disable-line unicorn/error-message
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
}
