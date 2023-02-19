var PATH: any[] = require("path");
var FS: HTMLElement = require("fs");

var build_dir: string = PATH.join(__dirname, "build");

function readFile(path: string): string {
	var abs_path: string = PATH.join(__dirname, "lib", path);
	return FS.readFileSync(abs_path, "utf8");
}

function stripCommonJS(text: string): any[] {
	return text.replace(/\/\/\.CommonJS(?:.|\n)*?\/\/\/CommonJS/g, "");
}

var files: any[] = [readFile("CSSOM.js")];
var index_file: string = readFile("index.js");

(function(){
	var exports: Function = {};
	function require(path: string): object {
		var text: string = readFile(path + ".js");
		files.push(stripCommonJS(text).trimLeft());
		return {};
	}
	eval(index_file);
})();

try {
	FS.statSync(build_dir);
} catch(e) {
	FS.mkdirSync(build_dir, 0755);
}
var build_path: string = PATH.join(build_dir, "CSSOM.js");
FS.writeFileSync(build_path, files.join(""));
process.stdout.write("build/CSSOM.js is done\n");
