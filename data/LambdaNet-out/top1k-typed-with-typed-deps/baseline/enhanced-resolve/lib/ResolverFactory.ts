/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const versions: Object = require("process").versions;
const Resolver: Array = require("./Resolver");
const { getType, PathType } = require("./util/path");

const SyncAsyncFileSystemDecorator: String = require("./SyncAsyncFileSystemDecorator");

const AliasFieldPlugin: String = require("./AliasFieldPlugin");
const AliasPlugin: Array = require("./AliasPlugin");
const AppendPlugin: Array = require("./AppendPlugin");
const ConditionalPlugin: Array = require("./ConditionalPlugin");
const DescriptionFilePlugin: Function = require("./DescriptionFilePlugin");
const DirectoryExistsPlugin: Array = require("./DirectoryExistsPlugin");
const ExportsFieldPlugin: String = require("./ExportsFieldPlugin");
const ExtensionAliasPlugin: String = require("./ExtensionAliasPlugin");
const FileExistsPlugin: String = require("./FileExistsPlugin");
const ImportsFieldPlugin: Array = require("./ImportsFieldPlugin");
const JoinRequestPartPlugin: String = require("./JoinRequestPartPlugin");
const JoinRequestPlugin: Array = require("./JoinRequestPlugin");
const MainFieldPlugin: Array = require("./MainFieldPlugin");
const ModulesInHierarchicalDirectoriesPlugin: Array = require("./ModulesInHierarchicalDirectoriesPlugin");
const ModulesInRootPlugin: Array = require("./ModulesInRootPlugin");
const NextPlugin: Object = require("./NextPlugin");
const ParsePlugin: Array = require("./ParsePlugin");
const PnpPlugin: Array = require("./PnpPlugin");
const RestrictionsPlugin: Array = require("./RestrictionsPlugin");
const ResultPlugin: Array = require("./ResultPlugin");
const RootsPlugin: String = require("./RootsPlugin");
const SelfReferencePlugin: Array = require("./SelfReferencePlugin");
const SymlinkPlugin: Array = require("./SymlinkPlugin");
const TryNextPlugin: Array = require("./TryNextPlugin");
const UnsafeCachePlugin: Array = require("./UnsafeCachePlugin");
const UseFilePlugin: Array = require("./UseFilePlugin");

/** @typedef {import("./AliasPlugin").AliasOption} AliasOptionEntry */
/** @typedef {import("./ExtensionAliasPlugin").ExtensionAliasOption} ExtensionAliasOption */
/** @typedef {import("./PnpPlugin").PnpApiImpl} PnpApi */
/** @typedef {import("./Resolver").FileSystem} FileSystem */
/** @typedef {import("./Resolver").ResolveRequest} ResolveRequest */
/** @typedef {import("./Resolver").SyncFileSystem} SyncFileSystem */

/** @typedef {string|string[]|false} AliasOptionNewRequest */
/** @typedef {{[k: string]: AliasOptionNewRequest}} AliasOptions */
/** @typedef {{[k: string]: string|string[] }} ExtensionAliasOptions */
/** @typedef {{apply: function(Resolver): void} | function(this: Resolver, Resolver): void} Plugin */

/**
 * @typedef {Object} UserResolveOptions
 * @property {(AliasOptions | AliasOptionEntry[])=} alias A list of module alias configurations or an object which maps key to value
 * @property {(AliasOptions | AliasOptionEntry[])=} fallback A list of module alias configurations or an object which maps key to value, applied only after modules option
 * @property {ExtensionAliasOptions=} extensionAlias An object which maps extension to extension aliases
 * @property {(string | string[])[]=} aliasFields A list of alias fields in description files
 * @property {(function(ResolveRequest): boolean)=} cachePredicate A function which decides whether a request should be cached or not. An object is passed with at least `path` and `request` properties.
 * @property {boolean=} cacheWithContext Whether or not the unsafeCache should include request context as part of the cache key.
 * @property {string[]=} descriptionFiles A list of description files to read from
 * @property {string[]=} conditionNames A list of exports field condition names.
 * @property {boolean=} enforceExtension Enforce that a extension from extensions must be used
 * @property {(string | string[])[]=} exportsFields A list of exports fields in description files
 * @property {(string | string[])[]=} importsFields A list of imports fields in description files
 * @property {string[]=} extensions A list of extensions which should be tried for files
 * @property {FileSystem} fileSystem The file system which should be used
 * @property {(object | boolean)=} unsafeCache Use this cache object to unsafely cache the successful requests
 * @property {boolean=} symlinks Resolve symlinks to their symlinked location
 * @property {Resolver=} resolver A prepared Resolver to which the plugins are attached
 * @property {string[] | string=} modules A list of directories to resolve modules from, can be absolute path or folder name
 * @property {(string | string[] | {name: string | string[], forceRelative: boolean})[]=} mainFields A list of main fields in description files
 * @property {string[]=} mainFiles  A list of main files in directories
 * @property {Plugin[]=} plugins A list of additional resolve plugins which should be applied
 * @property {PnpApi | null=} pnpApi A PnP API that should be used - null is "never", undefined is "auto"
 * @property {string[]=} roots A list of root paths
 * @property {boolean=} fullySpecified The request is already fully specified and no extensions or directories are resolved for it
 * @property {boolean=} resolveToContext Resolve to a context instead of a file
 * @property {(string|RegExp)[]=} restrictions A list of resolve restrictions
 * @property {boolean=} useSyncFileSystemCalls Use only the sync constraints of the file system calls
 * @property {boolean=} preferRelative Prefer to resolve module requests as relative requests before falling back to modules
 * @property {boolean=} preferAbsolute Prefer to resolve server-relative urls as absolute paths before falling back to resolve in roots
 */

/**
 * @typedef {Object} ResolveOptions
 * @property {AliasOptionEntry[]} alias
 * @property {AliasOptionEntry[]} fallback
 * @property {Set<string | string[]>} aliasFields
 * @property {ExtensionAliasOption[]} extensionAlias
 * @property {(function(ResolveRequest): boolean)} cachePredicate
 * @property {boolean} cacheWithContext
 * @property {Set<string>} conditionNames A list of exports field condition names.
 * @property {string[]} descriptionFiles
 * @property {boolean} enforceExtension
 * @property {Set<string | string[]>} exportsFields
 * @property {Set<string | string[]>} importsFields
 * @property {Set<string>} extensions
 * @property {FileSystem} fileSystem
 * @property {object | false} unsafeCache
 * @property {boolean} symlinks
 * @property {Resolver=} resolver
 * @property {Array<string | string[]>} modules
 * @property {{name: string[], forceRelative: boolean}[]} mainFields
 * @property {Set<string>} mainFiles
 * @property {Plugin[]} plugins
 * @property {PnpApi | null} pnpApi
 * @property {Set<string>} roots
 * @property {boolean} fullySpecified
 * @property {boolean} resolveToContext
 * @property {Set<string|RegExp>} restrictions
 * @property {boolean} preferRelative
 * @property {boolean} preferAbsolute
 */

/**
 * @param {PnpApi | null=} option option
 * @returns {PnpApi | null} processed option
 */
function processPnpApiOption(option: Number): Number {
	if (
		option === undefined &&
		/** @type {NodeJS.ProcessVersions & {pnp: string}} */ versions.pnp
	) {
		// @ts-ignore
		return require("pnpapi"); // eslint-disable-line node/no-missing-require
	}

	return option || null;
}

/**
 * @param {AliasOptions | AliasOptionEntry[] | undefined} alias alias
 * @returns {AliasOptionEntry[]} normalized aliases
 */
function normalizeAlias(alias: Object): String {
	return typeof alias === "object" && !Array.isArray(alias) && alias !== null
		? Object.keys(alias).map((key: String) => {
				/** @type {AliasOptionEntry} */
				const obj: Object = { name: key, onlyModule: false, alias: alias[key] };

				if (/\$$/.test(key)) {
					obj.onlyModule = true;
					obj.name = key.substr(0, key.length - 1);
				}

				return obj;
		  })
		: /** @type {Array<AliasOptionEntry>} */ (alias) || [];
}

/**
 * @param {UserResolveOptions} options input options
 * @returns {ResolveOptions} output options
 */
function createOptions(options: Object): Object {
	const mainFieldsSet: Error = new Set(options.mainFields || ["main"]);
	const mainFields: Array = [];

	for (const item of mainFieldsSet) {
		if (typeof item === "string") {
			mainFields.push({
				name: [item],
				forceRelative: true
			});
		} else if (Array.isArray(item)) {
			mainFields.push({
				name: item,
				forceRelative: true
			});
		} else {
			mainFields.push({
				name: Array.isArray(item.name) ? item.name : [item.name],
				forceRelative: item.forceRelative
			});
		}
	}

	return {
		alias: normalizeAlias(options.alias),
		fallback: normalizeAlias(options.fallback),
		aliasFields: new Set(options.aliasFields),
		cachePredicate:
			options.cachePredicate ||
			function () {
				return true;
			},
		cacheWithContext:
			typeof options.cacheWithContext !== "undefined"
				? options.cacheWithContext
				: true,
		exportsFields: new Set(options.exportsFields || ["exports"]),
		importsFields: new Set(options.importsFields || ["imports"]),
		conditionNames: new Set(options.conditionNames),
		descriptionFiles: Array.from(
			new Set(options.descriptionFiles || ["package.json"])
		),
		enforceExtension:
			options.enforceExtension === undefined
				? options.extensions && options.extensions.includes("")
					? true
					: false
				: options.enforceExtension,
		extensions: new Set(options.extensions || [".js", ".json", ".node"]),
		extensionAlias: options.extensionAlias
			? Object.keys(options.extensionAlias).map((k: String) => ({
					extension: k,
					alias: /** @type {ExtensionAliasOptions} */ (options.extensionAlias)[
						k
					]
			  }))
			: [],
		fileSystem: options.useSyncFileSystemCalls
			? new SyncAsyncFileSystemDecorator(
					/** @type {SyncFileSystem} */ (
						/** @type {unknown} */ (options.fileSystem)
					)
			  )
			: options.fileSystem,
		unsafeCache:
			options.unsafeCache && typeof options.unsafeCache !== "object"
				? {}
				: options.unsafeCache || false,
		symlinks: typeof options.symlinks !== "undefined" ? options.symlinks : true,
		resolver: options.resolver,
		modules: mergeFilteredToArray(
			Array.isArray(options.modules)
				? options.modules
				: options.modules
				? [options.modules]
				: ["node_modules"],
			(item: String) => {
				const type: Number = getType(item);
				return type === PathType.Normal || type === PathType.Relative;
			}
		),
		mainFields,
		mainFiles: new Set(options.mainFiles || ["index"]),
		plugins: options.plugins || [],
		pnpApi: processPnpApiOption(options.pnpApi),
		roots: new Set(options.roots || undefined),
		fullySpecified: options.fullySpecified || false,
		resolveToContext: options.resolveToContext || false,
		preferRelative: options.preferRelative || false,
		preferAbsolute: options.preferAbsolute || false,
		restrictions: new Set(options.restrictions)
	};
}

/**
 * @param {UserResolveOptions} options resolve options
 * @returns {Resolver} created resolver
 */
exports.createResolver = function (options: Object) {
	const normalizedOptions: Object = createOptions(options);

	const {
		alias,
		fallback,
		aliasFields,
		cachePredicate,
		cacheWithContext,
		conditionNames,
		descriptionFiles,
		enforceExtension,
		exportsFields,
		extensionAlias,
		importsFields,
		extensions,
		fileSystem,
		fullySpecified,
		mainFields,
		mainFiles,
		modules,
		plugins: userPlugins,
		pnpApi,
		resolveToContext,
		preferRelative,
		preferAbsolute,
		symlinks,
		unsafeCache,
		resolver: customResolver,
		restrictions,
		roots
	} = normalizedOptions;

	const plugins: Array = userPlugins.slice();

	const resolver: Resolver = customResolver
		? customResolver
		: new Resolver(fileSystem, normalizedOptions);

	//// pipeline ////

	resolver.ensureHook("resolve");
	resolver.ensureHook("internalResolve");
	resolver.ensureHook("newInternalResolve");
	resolver.ensureHook("parsedResolve");
	resolver.ensureHook("describedResolve");
	resolver.ensureHook("rawResolve");
	resolver.ensureHook("normalResolve");
	resolver.ensureHook("internal");
	resolver.ensureHook("rawModule");
	resolver.ensureHook("module");
	resolver.ensureHook("resolveAsModule");
	resolver.ensureHook("undescribedResolveInPackage");
	resolver.ensureHook("resolveInPackage");
	resolver.ensureHook("resolveInExistingDirectory");
	resolver.ensureHook("relative");
	resolver.ensureHook("describedRelative");
	resolver.ensureHook("directory");
	resolver.ensureHook("undescribedExistingDirectory");
	resolver.ensureHook("existingDirectory");
	resolver.ensureHook("undescribedRawFile");
	resolver.ensureHook("rawFile");
	resolver.ensureHook("file");
	resolver.ensureHook("finalFile");
	resolver.ensureHook("existingFile");
	resolver.ensureHook("resolved");

	// TODO remove in next major
	// cspell:word Interal
	// Backward-compat
	resolver.hooks.newInteralResolve = resolver.hooks.newInternalResolve;

	// resolve
	for (const { source, resolveOptions } of [
		{ source: "resolve", resolveOptions: { fullySpecified } },
		{ source: "internal-resolve", resolveOptions: { fullySpecified: false } }
	]) {
		if (unsafeCache) {
			plugins.push(
				new UnsafeCachePlugin(
					source,
					cachePredicate,
					unsafeCache,
					cacheWithContext,
					`new-${source}`
				)
			);
			plugins.push(
				new ParsePlugin(`new-${source}`, resolveOptions, "parsed-resolve")
			);
		} else {
			plugins.push(new ParsePlugin(source, resolveOptions, "parsed-resolve"));
		}
	}

	// parsed-resolve
	plugins.push(
		new DescriptionFilePlugin(
			"parsed-resolve",
			descriptionFiles,
			false,
			"described-resolve"
		)
	);
	plugins.push(new NextPlugin("after-parsed-resolve", "described-resolve"));

	// described-resolve
	plugins.push(new NextPlugin("described-resolve", "raw-resolve"));
	if (fallback.length > 0) {
		plugins.push(
			new AliasPlugin("described-resolve", fallback, "internal-resolve")
		);
	}

	// raw-resolve
	if (alias.length > 0) {
		plugins.push(new AliasPlugin("raw-resolve", alias, "internal-resolve"));
	}
	aliasFields.forEach((item: String) => {
		plugins.push(new AliasFieldPlugin("raw-resolve", item, "internal-resolve"));
	});
	extensionAlias.forEach((item: String) =>
		plugins.push(
			new ExtensionAliasPlugin("raw-resolve", item, "normal-resolve")
		)
	);
	plugins.push(new NextPlugin("raw-resolve", "normal-resolve"));

	// normal-resolve
	if (preferRelative) {
		plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
	}
	plugins.push(
		new ConditionalPlugin(
			"after-normal-resolve",
			{ module: true },
			"resolve as module",
			false,
			"raw-module"
		)
	);
	plugins.push(
		new ConditionalPlugin(
			"after-normal-resolve",
			{ internal: true },
			"resolve as internal import",
			false,
			"internal"
		)
	);
	if (preferAbsolute) {
		plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
	}
	if (roots.size > 0) {
		plugins.push(new RootsPlugin("after-normal-resolve", roots, "relative"));
	}
	if (!preferRelative && !preferAbsolute) {
		plugins.push(new JoinRequestPlugin("after-normal-resolve", "relative"));
	}

	// internal
	importsFields.forEach((importsField: String) => {
		plugins.push(
			new ImportsFieldPlugin(
				"internal",
				conditionNames,
				importsField,
				"relative",
				"internal-resolve"
			)
		);
	});

	// raw-module
	exportsFields.forEach((exportsField: String) => {
		plugins.push(
			new SelfReferencePlugin("raw-module", exportsField, "resolve-as-module")
		);
	});
	modules.forEach((item: Array) => {
		if (Array.isArray(item)) {
			if (item.includes("node_modules") && pnpApi) {
				plugins.push(
					new ModulesInHierarchicalDirectoriesPlugin(
						"raw-module",
						item.filter((i: Number) => i !== "node_modules"),
						"module"
					)
				);
				plugins.push(
					new PnpPlugin("raw-module", pnpApi, "undescribed-resolve-in-package")
				);
			} else {
				plugins.push(
					new ModulesInHierarchicalDirectoriesPlugin(
						"raw-module",
						item,
						"module"
					)
				);
			}
		} else {
			plugins.push(new ModulesInRootPlugin("raw-module", item, "module"));
		}
	});

	// module
	plugins.push(new JoinRequestPartPlugin("module", "resolve-as-module"));

	// resolve-as-module
	if (!resolveToContext) {
		plugins.push(
			new ConditionalPlugin(
				"resolve-as-module",
				{ directory: false, request: "." },
				"single file module",
				true,
				"undescribed-raw-file"
			)
		);
	}
	plugins.push(
		new DirectoryExistsPlugin(
			"resolve-as-module",
			"undescribed-resolve-in-package"
		)
	);

	// undescribed-resolve-in-package
	plugins.push(
		new DescriptionFilePlugin(
			"undescribed-resolve-in-package",
			descriptionFiles,
			false,
			"resolve-in-package"
		)
	);
	plugins.push(
		new NextPlugin("after-undescribed-resolve-in-package", "resolve-in-package")
	);

	// resolve-in-package
	exportsFields.forEach((exportsField: String) => {
		plugins.push(
			new ExportsFieldPlugin(
				"resolve-in-package",
				conditionNames,
				exportsField,
				"relative"
			)
		);
	});
	plugins.push(
		new NextPlugin("resolve-in-package", "resolve-in-existing-directory")
	);

	// resolve-in-existing-directory
	plugins.push(
		new JoinRequestPlugin("resolve-in-existing-directory", "relative")
	);

	// relative
	plugins.push(
		new DescriptionFilePlugin(
			"relative",
			descriptionFiles,
			true,
			"described-relative"
		)
	);
	plugins.push(new NextPlugin("after-relative", "described-relative"));

	// described-relative
	if (resolveToContext) {
		plugins.push(new NextPlugin("described-relative", "directory"));
	} else {
		plugins.push(
			new ConditionalPlugin(
				"described-relative",
				{ directory: false },
				null,
				true,
				"raw-file"
			)
		);
		plugins.push(
			new ConditionalPlugin(
				"described-relative",
				{ fullySpecified: false },
				"as directory",
				true,
				"directory"
			)
		);
	}

	// directory
	plugins.push(
		new DirectoryExistsPlugin("directory", "undescribed-existing-directory")
	);

	if (resolveToContext) {
		// undescribed-existing-directory
		plugins.push(new NextPlugin("undescribed-existing-directory", "resolved"));
	} else {
		// undescribed-existing-directory
		plugins.push(
			new DescriptionFilePlugin(
				"undescribed-existing-directory",
				descriptionFiles,
				false,
				"existing-directory"
			)
		);
		mainFiles.forEach((item: String) => {
			plugins.push(
				new UseFilePlugin(
					"undescribed-existing-directory",
					item,
					"undescribed-raw-file"
				)
			);
		});

		// described-existing-directory
		mainFields.forEach((item: String) => {
			plugins.push(
				new MainFieldPlugin(
					"existing-directory",
					item,
					"resolve-in-existing-directory"
				)
			);
		});
		mainFiles.forEach((item: String) => {
			plugins.push(
				new UseFilePlugin("existing-directory", item, "undescribed-raw-file")
			);
		});

		// undescribed-raw-file
		plugins.push(
			new DescriptionFilePlugin(
				"undescribed-raw-file",
				descriptionFiles,
				true,
				"raw-file"
			)
		);
		plugins.push(new NextPlugin("after-undescribed-raw-file", "raw-file"));

		// raw-file
		plugins.push(
			new ConditionalPlugin(
				"raw-file",
				{ fullySpecified: true },
				null,
				false,
				"file"
			)
		);
		if (!enforceExtension) {
			plugins.push(new TryNextPlugin("raw-file", "no extension", "file"));
		}
		extensions.forEach((item: String) => {
			plugins.push(new AppendPlugin("raw-file", item, "file"));
		});

		// file
		if (alias.length > 0)
			plugins.push(new AliasPlugin("file", alias, "internal-resolve"));
		aliasFields.forEach((item: String) => {
			plugins.push(new AliasFieldPlugin("file", item, "internal-resolve"));
		});
		plugins.push(new NextPlugin("file", "final-file"));

		// final-file
		plugins.push(new FileExistsPlugin("final-file", "existing-file"));

		// existing-file
		if (symlinks)
			plugins.push(new SymlinkPlugin("existing-file", "existing-file"));
		plugins.push(new NextPlugin("existing-file", "resolved"));
	}

	// resolved
	if (restrictions.size > 0) {
		plugins.push(new RestrictionsPlugin(resolver.hooks.resolved, restrictions));
	}
	plugins.push(new ResultPlugin(resolver.hooks.resolved));

	//// RESOLVER ////

	for (const plugin of plugins) {
		if (typeof plugin === "function") {
			plugin.call(resolver, resolver);
		} else {
			plugin.apply(resolver);
		}
	}

	return resolver;
};

/**
 * Merging filtered elements
 * @param {string[]} array source array
 * @param {function(string): boolean} filter predicate
 * @returns {Array<string | string[]>} merge result
 */
function mergeFilteredToArray(array: Object, filter: Function): Array {
	/** @type {Array<string | string[]>} */
	const result: Array = [];
	const set: Error = new Set(array);

	for (const item of set) {
		if (filter(item)) {
			const lastElement: Array =
				result.length > 0 ? result[result.length - 1] : undefined;
			if (Array.isArray(lastElement)) {
				lastElement.push(item);
			} else {
				result.push([item]);
			}
		} else {
			result.push(item);
		}
	}

	return result;
}
