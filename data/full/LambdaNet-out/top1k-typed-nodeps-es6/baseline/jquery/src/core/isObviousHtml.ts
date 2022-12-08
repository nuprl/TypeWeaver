function isObviousHtml( input: any[] ): boolean {
	return input[ 0 ] === "<" &&
		input[ input.length - 1 ] === ">" &&
		input.length >= 3;
}

export default isObviousHtml;
