'use strict'

import vendors from './vendors.json';

const env: object = process.env

// Used for testing only
Object.defineProperty(exports, '_vendors', {
  value: vendors.map(function (v: object) {
    return v.constant
  })
})

exports.name = null
exports.isPR = null

vendors.forEach(function (vendor: HTMLElement) {
  const envs: any[] = Array.isArray(vendor.env) ? vendor.env : [vendor.env]
  const isCI: boolean = envs.every(function (obj: string) {
    return checkEnv(obj)
  })

  exports[vendor.constant] = isCI

  if (!isCI) {
    return
  }

  exports.name = vendor.name

  switch (typeof vendor.pr) {
    case 'string':
      // "pr": "CIRRUS_PR"
      exports.isPR = !!env[vendor.pr]
      break
    case 'object':
      if ('env' in vendor.pr) {
        // "pr": { "env": "BUILDKITE_PULL_REQUEST", "ne": "false" }
        exports.isPR = vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne
      } else if ('any' in vendor.pr) {
        // "pr": { "any": ["ghprbPullId", "CHANGE_ID"] }
        exports.isPR = vendor.pr.any.some(function (key: string) {
          return !!env[key]
        })
      } else {
        // "pr": { "DRONE_BUILD_EVENT": "pull_request" }
        exports.isPR = checkEnv(vendor.pr)
      }
      break
    default:
      // PR detection not supported for this vendor
      exports.isPR = null
  }
})

exports.isCI = !!(
  env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
  env.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
  env.BUILD_NUMBER || // Jenkins, TeamCity
  env.CI_APP_ID || // Appflow
  env.CI_BUILD_ID || // Appflow
  env.CI_BUILD_NUMBER || // Appflow
  env.RUN_ID || // TaskCluster, dsari
  exports.name ||
  false
)

function checkEnv (obj: object): boolean {
  if (typeof obj === 'string') return !!env[obj]
  return Object.keys(obj).every(function (k: string) {
    return env[k] === obj[k]
  })
}
