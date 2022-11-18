import path from 'path';
import fs from 'fs';

// When --write is set, files will be written in place
// Otherwise it only prints outdated files
const doWrite: boolean = process.argv.includes("--write");

const allFiles: Error = new Set();
const findFiles: Function = (p: string) => {
	const s: Resolver = fs.statSync(p);
	if (s.isDirectory()) {
		for (const name of fs.readdirSync(p)) {
			if (name.startsWith(".")) continue;
			findFiles(path.join(p, name));
		}
	} else if (s.isFile()) {
		allFiles.add(p);
	}
};
findFiles(path.resolve(__dirname, "../lib"));

let canUpdateWithWrite: boolean = false;

const sortImport: Function = (a: object, b: object) => {
	if (!a.key.startsWith(".") && b.key.startsWith(".")) return -1;
	if (a.key.startsWith(".") && !b.key.startsWith(".")) return 1;
	if (a.key < b.key) return -1;
	if (a.key > b.key) return 1;
	return 0;
};

const execToArray: Function = (content: string, regexp: HTMLElement) => {
	const items: any[] = [];
	let match: object = regexp.exec(content);
	while (match) {
		items.push({
			content: match[0],
			key: match[1] + match[2]
		});
		match = regexp.exec(content);
	}
	return items;
};

const schema: Promise = [
	{
		title: "license comment",
		regexp: /\/\*\n\s*MIT License http:\/\/www\.opensource\.org\/licenses\/mit-license\.php\n\s*(?:(Authors? .+)\n)?\s*\*\/\n/g,
		updateMessage: "update the license comment",
		update(content, author) {
			return (
				[
					"/*",
					"\tMIT License http://www.opensource.org/licenses/mit-license.php",
					author && `\t${author}`,
					"*/"
				]
					.filter(Boolean)
					.join("\n") + "\n"
			);
		}
	},
	{
		title: "new line after license comment",
		regexp: /\n?/g,
		updateMessage: "insert a new line after the license comment",
		update() {
			return "\n";
		}
	},
	{
		title: "strict mode",
		regexp: /"use strict";\n/g
	},
	{
		title: "new line after strict mode",
		regexp: /\n?/g,
		updateMessage: 'insert a new line after "use strict"',
		update() {
			return "\n";
		}
	},
	{
		title: "imports",
		regexp: /(const (\{\s+\w+(?::\s+\w+)?(,\s+\w+(?::\s+\w+)?)*\s+\}|\w+) = (\/\*\* @type \{TODO\} \*\/\s\()?require\("[^"]+"\)\)?(\.\w+)*;\n)+\n/g,
		updateMessage: "sort imports alphabetically",
		update(content) {
			const items = execToArray(
				content,
				/const (?:\{\s+\w+(?::\s+\w+)?(?:,\s+\w+(?::\s+\w+)?)*\s+\}|\w+) = (?:\/\*\* @type \{TODO\} \*\/\s\()?require\("([^"]+)"\)\)?((?:\.\w+)*);\n/g
			);
			items.sort(sortImport);
			return items.map(item => item.content).join("") + "\n";
		},
		optional: true,
		repeat: true
	},
	{
		title: "type imports",
		regexp: /(\/\*\* (?:@template \w+ )*@typedef \{import\("[^"]+"\)(\.\w+)*(?:<(?:(?:\w\.)*\w+, )*(?:\w\.)*\w+>)?\} \w+(?:<(?:(?:\w\.)*\w+, )*(?:\w\.)*\w+>)? \*\/\n)+\n/g,
		updateMessage: "sort type imports alphabetically",
		update(content) {
			const items = execToArray(
				content,
				/\/\*\* (?:@template \w+ )*@typedef \{import\("([^"]+)"\)((?:\.\w+)*(?:<(?:(?:\w\.)*\w+, )*(?:\w\.)*\w+>)?)\} \w+(?:<(?:(?:\w\.)*\w+, )*(?:\w\.)*\w+>)? \*\/\n/g
			);
			items.sort(sortImport);
			return items.map(item => item.content).join("") + "\n";
		},
		optional: true,
		repeat: true
	}
];

for (const filePath of allFiles) {
	let content: string = fs.readFileSync(filePath, "utf-8");
	const nl: Promise = /(\r?\n)/.exec(content);
	content = content.replace(/\r?\n/g, "\n");
	let newContent: string = content;

	let state: number = 0;
	let pos: number = 0;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const current: object = schema[state];
		if (!current) break;
		current.regexp.lastIndex = pos;
		const match: object = current.regexp.exec(newContent);
		if (!match) {
			if (current.optional) {
				state++;
				continue;
			}
			console.log(`${filePath}: Missing ${current.title} at ${pos}`);
			process.exitCode = 1;
			break;
		}
		if (match.index !== pos) {
			console.log(
				`${filePath}: Unexpected code at ${pos}-${match.index}, expected ${current.title}`
			);
			process.exitCode = 1;
			pos = match.index;
		}
		if (!current.repeat) {
			state++;
		}
		if (current.update) {
			const update: string = current.update(...match);
			if (update !== match[0]) {
				newContent =
					newContent.substr(0, pos) +
					update +
					newContent.slice(pos + match[0].length);
				pos += update.length;
				if (!doWrite) {
					const updateMessage: string =
						current.updateMessage || `${current.title} need to be updated`;
					console.log(`${filePath}: ${updateMessage}`);
				}
				continue;
			}
		}
		pos += match[0].length;
	}

	if (newContent !== content) {
		if (doWrite) {
			if (nl) {
				newContent = newContent.replace(/\n/g, nl[0]);
			}
			fs.writeFileSync(filePath, newContent, "utf-8");
			console.log(filePath);
		} else {
			canUpdateWithWrite = true;
			process.exitCode = 1;
		}
	}
}

if (canUpdateWithWrite) {
	console.log("Run 'yarn fix' to try to fix the problem automatically");
}
