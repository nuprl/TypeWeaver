const {stdin} = process;

const getStdinBuffer: Function = async () => {
	if (stdin.isTTY) {
		return Buffer.alloc(0);
	}

	const result: any[] = [];
	let length: number = 0;

	for await (const chunk of stdin) {
		result.push(chunk);
		length += chunk.length;
	}

	return Buffer.concat(result, length);
};

export default async function getStdin(): HTMLElement {
	const buffer: object = await getStdinBuffer();
	return buffer.toString();
}

getStdin.buffer = getStdinBuffer;
