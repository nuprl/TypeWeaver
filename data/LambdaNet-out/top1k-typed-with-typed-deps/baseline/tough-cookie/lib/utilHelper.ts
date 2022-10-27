function requireUtil(): String {
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
function tryReadingCustomSymbolFromUtilInspect(options: Object): Number {
  const _requireUtil: Function = options.requireUtil || requireUtil;
  const util: Boolean = _requireUtil();
  return util ? util.inspect.custom : null;
}

exports.getUtilInspect = function getUtilInspect(fallback: Function, options: Object = {}): Function {
  const _requireUtil: Function = options.requireUtil || requireUtil;
  const util: Boolean = _requireUtil();
  return function inspect(value: String, showHidden: String, depth: String): String {
    return util ? util.inspect(value, showHidden, depth) : fallback(value);
  };
};

exports.getCustomInspectSymbol = function getCustomInspectSymbol(options: Object = {}): Boolean {
  const _lookupCustomInspectSymbol: Function =
    options.lookupCustomInspectSymbol || lookupCustomInspectSymbol;

  // get custom inspect symbol for node environments
  return (
    _lookupCustomInspectSymbol() ||
    tryReadingCustomSymbolFromUtilInspect(options)
  );
};
