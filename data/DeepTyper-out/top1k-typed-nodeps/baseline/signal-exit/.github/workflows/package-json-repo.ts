#!/usr/bin/env node

const pf: any = require.resolve(`${process.cwd()}/package.json`)
const pj: any = require(pf)

if (!pj.repository && process.env.GITHUB_REPOSITORY) {
  const fs: any = require('fs')
  const server: any = process.env.GITHUB_SERVER_URL || 'https://github.com'
  const repo: string = `${server}/${process.env.GITHUB_REPOSITORY}`
  pj.repository = repo
  const json: any = fs.readFileSync(pf, 'utf8')
  const match: any = json.match(/^\s*\{[\r\n]+([ \t]*)"/)
  const indent: any = match[1]
  const output: string = JSON.stringify(pj, null, indent || 2) + '\n'
  fs.writeFileSync(pf, output)
}
