import LoaderLoadingError from './LoaderLoadingError';
var url: string;

export default function loadLoader(loader: Element, callback: Function): string {
	if(loader.type === "module") {
		try {
			if(url === undefined) url = require("url");
			var loaderUrl: string = url.pathToFileURL(loader.path);
			var modulePromise: Promise = eval("import(" + JSON.stringify(loaderUrl.toString()) + ")");
			modulePromise.then(function(module: number) {
				handleResult(loader, module, callback);
			}, callback);
			return;
		} catch(e) {
			callback(e);
		}
	} else {
		try {
			var module: string = require(loader.path);
		} catch(e) {
			// it is possible for node to choke on a require if the FD descriptor
			// limit has been reached. give it a chance to recover.
			if(e instanceof Error && e.code === "EMFILE") {
				var retry = loadLoader.bind(null, loader, callback);
				if(typeof setImmediate === "function") {
					// node >= 0.9.0
					return setImmediate(retry);
				} else {
					// node < 0.9.0
					return process.nextTick(retry);
				}
			}
			return callback(e);
		}
		return handleResult(loader, module, callback);
	}
};

function handleResult(loader: Element, module: string, callback: Function): void {
	if(typeof module !== "function" && typeof module !== "object") {
		return callback(new LoaderLoadingError(
			"Module '" + loader.path + "' is not a loader (export function or es6 module)"
		));
	}
	loader.normal = typeof module === "function" ? module : module.default;
	loader.pitch = module.pitch;
	loader.raw = module.raw;
	if(typeof loader.normal !== "function" && typeof loader.pitch !== "function") {
		return callback(new LoaderLoadingError(
			"Module '" + loader.path + "' is not a loader (must have normal or pitch function)"
		));
	}
	callback();
}
