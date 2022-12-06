const singleComment: symbol = Symbol('singleComment');
const multiComment: symbol = Symbol('multiComment');

const stripWithoutWhitespace: string = () => '';
const stripWithWhitespace: string = (string, start: number, end: number) => string.slice(start, end).replace(/\S/g, ' ');

const isEscaped: boolean = (jsonString: string, quotePosition: boolean) => {
	let index: number = quotePosition - 1;
	let backslashCount: number = 0;

	while (jsonString[index] === '\\') {
		index -= 1;
		backslashCount += 1;
	}

	return Boolean(backslashCount % 2);
};

export default function stripJsonComments(jsonString, {whitespace = true, trailingCommas = false} = {}) {
	if (typeof jsonString !== 'string') {
		throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof jsonString}\``);
	}

	const strip: string = whitespace ? stripWithWhitespace : stripWithoutWhitespace;

	let isInsideString: boolean = false;
	let isInsideComment: boolean = false;
	let offset: number = 0;
	let buffer: string = '';
	let result: string = '';
	let commaIndex: number = -1;

	for (let index = 0; index < jsonString.length; index++) {
		const currentCharacter: string = jsonString[index];
		const nextCharacter: string = jsonString[index + 1];

		if (!isInsideComment && currentCharacter === '"') {
			// Enter or exit string
			const escaped: boolean = isEscaped(jsonString, index);
			if (!escaped) {
				isInsideString = !isInsideString;
			}
		}

		if (isInsideString) {
			continue;
		}

		if (!isInsideComment && currentCharacter + nextCharacter === '//') {
			// Enter single-line comment
			buffer += jsonString.slice(offset, index);
			offset = index;
			isInsideComment = singleComment;
			index++;
		} else if (isInsideComment === singleComment && currentCharacter + nextCharacter === '\r\n') {
			// Exit single-line comment via \r\n
			index++;
			isInsideComment = false;
			buffer += strip(jsonString, offset, index);
			offset = index;
			continue;
		} else if (isInsideComment === singleComment && currentCharacter === '\n') {
			// Exit single-line comment via \n
			isInsideComment = false;
			buffer += strip(jsonString, offset, index);
			offset = index;
		} else if (!isInsideComment && currentCharacter + nextCharacter === '/*') {
			// Enter multiline comment
			buffer += jsonString.slice(offset, index);
			offset = index;
			isInsideComment = multiComment;
			index++;
			continue;
		} else if (isInsideComment === multiComment && currentCharacter + nextCharacter === '*/') {
			// Exit multiline comment
			index++;
			isInsideComment = false;
			buffer += strip(jsonString, offset, index + 1);
			offset = index + 1;
			continue;
		} else if (trailingCommas && !isInsideComment) {
			if (commaIndex !== -1) {
				if (currentCharacter === '}' || currentCharacter === ']') {
					// Strip trailing comma
					buffer += jsonString.slice(offset, index);
					result += strip(buffer, 0, 1) + buffer.slice(1);
					buffer = '';
					offset = index;
					commaIndex = -1;
				} else if (currentCharacter !== ' ' && currentCharacter !== '\t' && currentCharacter !== '\r' && currentCharacter !== '\n') {
					// Hit non-whitespace following a comma; comma is not trailing
					buffer += jsonString.slice(offset, index);
					offset = index;
					commaIndex = -1;
				}
			} else if (currentCharacter === ',') {
				// Flush buffer prior to this point, and save new comma index
				result += buffer + jsonString.slice(offset, index);
				buffer = '';
				offset = index;
				commaIndex = index;
			}
		}
	}

	return result + buffer + (isInsideComment ? strip(jsonString.slice(offset)) : jsonString.slice(offset));
}
