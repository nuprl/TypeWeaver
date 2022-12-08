function requireUtil(): string {
  try {
    // eslint-disable-next-line no-restricted-modules
    return require("util");
  } catch (e) {
    return null;
  }
}

// for v10.12.0+
function lookupCustomInspectSymbol(): Promise {
  return Symbol.for("nodejs.util.inspect.custom");
}

// for older node environments
function tryReadingCustomSymbolFromUtilInspect(options: object): number {
  const _requireUtil: Function = options.requireUtil || requireUtil;
  const util: boolean = _requireUtil();
  return util ? util.inspect.custom : null;
}

exports.getUtilInspect = function getUtilInspect(fallback: Function, options: object = {}): Function {
  const _requireUtil: Function = options.requireUtil || requireUtil;
  const util: boolean = _requireUtil();
  return function inspect(value: string, showHidden: string, depth: string): string {
    return util ? util.inspect(value, showHidden, depth) : fallback(value);
  };
};

exports.getCustomInspectSymbol = function getCustomInspectSymbol(options: object = {}): boolean {
  const _lookupCustomInspectSymbol: Function =
    options.lookupCustomInspectSymbol || lookupCustomInspectSymbol;

  // get custom inspect symbol for node environments
  return (
    _lookupCustomInspectSymbol() ||
    tryReadingCustomSymbolFromUtilInspect(options)
  );
};
