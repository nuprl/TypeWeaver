module.exports = function (_require: require) {
  _require = _require || require
  var main = _require.main
  if (main && isIISNode(main)) return handleIISNode(main)
  else return main ? main.filename : process.cwd()
}

function isIISNode (main: Node) {
  return /\\iisnode\\/.test(main.filename)
}

function handleIISNode (main: IISNode) {
  if (!main.children.length) {
    return main.filename
  } else {
    return main.children[0].filename
  }
}