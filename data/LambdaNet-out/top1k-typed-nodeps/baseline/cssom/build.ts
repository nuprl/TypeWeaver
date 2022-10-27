var PATH: Array = require("path");
var FS: HTMLElement = require("fs");

var build_dir: String = PATH.join(__dirname, "build");

function readFile(path: String): String {
	var abs_path: String = PATH.join(__dirname, "lib", path);
	return FS.readFileSync(abs_path, "utf8");
}

function stripCommonJS(text: String): Array {
	return text.replace(/\/\/\.CommonJS(?:.|\n)*?\/\/\/CommonJS/g, "");
}

var files: Array = [readFile("CSSOM.js")];
var index_file: String = readFile("index.js");

(function(){
	var exports: Function = {};
	function require(path: String): Object {
		var text: String = readFile(path + ".js");
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
var build_path: String = PATH.join(build_dir, "CSSOM.js");
FS.writeFileSync(build_path, files.join(""));
process.stdout.write("build/CSSOM.js is done\n");
