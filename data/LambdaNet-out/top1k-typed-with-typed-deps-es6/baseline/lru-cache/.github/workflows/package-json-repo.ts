#!/usr/bin/env node

const pf: String = require.resolve(`${process.cwd()}/package.json`)
const pj: Array = require(pf)

if (!pj.repository && process.env.GITHUB_REPOSITORY) {
  const fs: String = require('fs')
  const server: String = process.env.GITHUB_SERVER_URL || 'https://github.com'
  const repo: String = `${server}/${process.env.GITHUB_REPOSITORY}`
  pj.repository = repo
  const json: String = fs.readFileSync(pf, 'utf8')
  const match: Object = json.match(/^\s*\{[\r\n]+([ \t]*)"/)
  const indent: LRUCache = match[1]
  const output: String = JSON.stringify(pj, null, indent || 2) + '\n'
  fs.writeFileSync(pf, output)
}
