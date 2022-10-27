export default function (_require): any {
  _require = _require || require
  var main: any = _require.main
  if (main && isIISNode(main)) return handleIISNode(main)
  else return main ? main.filename : process.cwd()
};

function isIISNode (main: any): string {
  return /\\iisnode\\/.test(main.filename)
}

function handleIISNode (main: any): any {
  if (!main.children.length) {
    return main.filename
  } else {
    return main.children[0].filename
  }
}
