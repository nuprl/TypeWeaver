import lenientFunction from './lenient.js';

export default function yn(value: string, {
	lenient = false,
	default: default_,
} = {}): void {
	if (default_ !== undefined && typeof default_ !== 'boolean') {
		throw new TypeError(`Expected the \`default\` option to be of type \`boolean\`, got \`${typeof default_}\``);
	}

	if (value === undefined || value === null) {
		return default_;
	}

	value = String(value).trim();

	if (/^(?:y|yes|true|1|on)$/i.test(value)) {
		return true;
	}

	if (/^(?:n|no|false|0|off)$/i.test(value)) {
		return false;
	}

	if (lenient === true) {
		return lenientFunction(value, default_);
	}

	return default_;
}
