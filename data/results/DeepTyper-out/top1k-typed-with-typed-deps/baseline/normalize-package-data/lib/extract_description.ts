module.exports = extractDescription

// Extracts description from contents of a readme file in markdown format
function extractDescription (d: any): string {
  if (!d) {
    return
  }
  if (d === 'ERROR: No README data found!') {
    return
  }
  // the first block of text before the first heading
  // that isn't the first line heading
  d = d.trim().split('\n')
  let s: string = 0
  while (d[s] && d[s].trim().match(/^(#|$)/)) {
    s++
  }
  const l: number = d.length
  let e: any = s + 1
  while (e < l && d[e].trim()) {
    e++
  }
  return d.slice(s, e).join(' ').trim()
}
