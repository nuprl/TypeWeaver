export default function (_require: Object) {
  _require = _require || require
  var main: HTMLElement = _require.main
  if (main && isIISNode(main)) return handleIISNode(main)
  else return main ? main.filename : process.cwd()
};

function isIISNode (main: Object): Boolean {
  return /\\iisnode\\/.test(main.filename)
}

function handleIISNode (main: HTMLElement): String {
  if (!main.children.length) {
    return main.filename
  } else {
    return main.children[0].filename
  }
}
