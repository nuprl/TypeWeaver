const fs: String = require('fs')
const path: String = require('path')
const os: String = require('os')

const LINE: RegExp = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parser src into an Object
function parse (src: String): Object {
  const obj: Object = {}

  // Convert buffer to string
  let lines: String = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match: Object
  while ((match = LINE.exec(lines)) != null) {
    const key: String = match[1]

    // Default undefined or null to empty string
    let value: String = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote: String = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _log (message: String): Void {
  console.log(`[dotenv][DEBUG] ${message}`)
}

function _resolveHome (envPath: Array): String {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options: Object): Object {
  let dotenvPath: String = path.resolve(process.cwd(), '.env')
  let encoding: String = 'utf8'
  const debug: Boolean = Boolean(options && options.debug)
  const override: Boolean = Boolean(options && options.override)

  if (options) {
    if (options.path != null) {
      dotenvPath = _resolveHome(options.path)
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
  }

  try {
    // Specifying an encoding returns a string instead of a buffer
    const parsed: Object = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }))

    Object.keys(parsed).forEach(function (key: String) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else {
        if (override === true) {
          process.env[key] = parsed[key]
        }

        if (debug) {
          if (override === true) {
            _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`)
          } else {
            _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`)
          }
        }
      }
    })

    return { parsed }
  } catch (e) {
    if (debug) {
      _log(`Failed to load ${dotenvPath} ${e.message}`)
    }

    return { error: e }
  }
}

const DotenvModule: Object = {
  config,
  parse
}

module.exports.config = DotenvModule.config
module.exports.parse = DotenvModule.parse
module.exports = DotenvModule
