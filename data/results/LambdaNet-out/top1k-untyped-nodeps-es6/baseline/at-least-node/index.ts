export default (r: any[]) => {
  const n: object = process.versions.node.split('.').map((x: string) => parseInt(x, 10))
  r = r.split('.').map((x: string) => parseInt(x, 10))
  return n[0] > r[0] || (n[0] === r[0] && (n[1] > r[1] || (n[1] === r[1] && n[2] >= r[2])))
};
