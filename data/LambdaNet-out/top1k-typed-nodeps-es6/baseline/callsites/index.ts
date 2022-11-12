export default function callsites(): Array {
	const _prepareStackTrace: Object = Error.prepareStackTrace;
	Error.prepareStackTrace = (_: Function, stack: String) => stack;
	const stack: Array = new Error().stack.slice(1); // eslint-disable-line unicorn/error-message
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
}
