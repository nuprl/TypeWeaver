export default function (_require: any) {
  _require = _require || require
  var main = _require.main
  if (main && isIISNode(main)) return handleIISNode(main)
  else return main ? main.filename : process.cwd()
};

function isIISNode (main: any) {
  return /\\iisnode\\/.test(main.filename)
}

function handleIISNode (main: IISNode) {
  if (!main.children.length) {
    return main.filename
  } else {
    return main.children[0].filename
  }
}