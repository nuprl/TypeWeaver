module.exports = function (_require: object) {
  _require = _require || require
  var main: HTMLElement = _require.main
  if (main && isIISNode(main)) return handleIISNode(main)
  else return main ? main.filename : process.cwd()
}

function isIISNode (main: object): boolean {
  return /\\iisnode\\/.test(main.filename)
}

function handleIISNode (main: HTMLElement): string {
  if (!main.children.length) {
    return main.filename
  } else {
    return main.children[0].filename
  }
}
