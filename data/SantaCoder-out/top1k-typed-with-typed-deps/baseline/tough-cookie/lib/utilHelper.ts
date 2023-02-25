function requireUtil() {
  try {
    // eslint-disable-next-line no-restricted-modules
    return require("util");
  } catch (e) {
    return null;
  }
}

// for v10.12.0+
function lookupCustomInspectSymbol() {
  return Symbol.for("nodejs.util.inspect.custom");
}

// for older node environments
function tryReadingCustomSymbolFromUtilInspect(options: ReadCustomSymbolFromUtilInspectOptions) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return util ? util.inspect.custom : null;
}

exports.getUtilInspect = function getUtilInspect(fallback: any, options = {}: IUtilInspectOptions) {
  const _requireUtil = options.requireUtil || requireUtil;
  const util = _requireUtil();
  return function inspect(value: any, showHidden: boolean, depth: number) {
    return util ? util.inspect(value, showHidden, depth) : fallback(value);
  };
};

exports.getCustomInspectSymbol = function getCustomInspectSymbol(options = {}: CustomInspectSymbolOptions) {
  const _lookupCustomInspectSymbol =
    options.lookupCustomInspectSymbol || lookupCustomInspectSymbol;

  // get custom inspect symbol for node environments
  return (
    _lookupCustomInspectSymbol() ||
    tryReadingCustomSymbolFromUtilInspect(options)
  );
};