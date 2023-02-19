const cp: any = require('child_process')

const defSpawnOptions: any = { stdio: 'inherit' }

/**
 * @summary Get shell program meta for current platform
 * @private
 * @returns {Object}
 */
function getShell (): any {
  if (process.platform === 'win32') {
    return { cmd: 'cmd', arg: '/C' }
  } else {
    return { cmd: 'sh', arg: '-c' }
  }
}

/**
 * Callback is called with the output when the process terminates. Output is
 * available when true is passed as options argument or stdio: null set
 * within given options.
 *
 * @summary Execute shell command forwarding all stdio
 * @param {String|Array} command
 * @param {Object|TRUE} [options] spawn() options or TRUE to set stdio: null
 * @param {Function} [callback]
 * @returns {ChildProcess}
 */
function execSh (command: string, options: any, callback: any): void {
  if (Array.isArray(command)) {
    command = command.join(';')
  }

  if (options === true) {
    options = { stdio: null }
  }

  if (typeof options === 'function') {
    callback = options
    options = defSpawnOptions
  } else {
    options = options || {}
    options = Object.assign({}, defSpawnOptions, options)
    callback = callback || function () {}
  }

  let child: any
  let stdout: string = ''
  let stderr: string = ''
  const shell: any = getShell()

  try {
    child = cp.spawn(shell.cmd, [shell.arg, command], options)
  } catch (e) {
    callback(e, stdout, stderr)
    return
  }

  if (child.stdout) {
    child.stdout.on('data', function (data: string) {
      stdout += data
    })
  }

  if (child.stderr) {
    child.stderr.on('data', function (data: string) {
      stderr += data
    })
  }

  child.on('close', function (code: string) {
    if (code) {
      const e: Error = new Error('Shell command exit with non zero code: ' + code)
      e.code = code
      callback(e, stdout, stderr)
    } else {
      callback(null, stdout, stderr)
    }
  })

  return child
}

execSh.promise = function (command: string, options: any) {
  return new Promise(function (resolve: void, reject: void) {
    execSh(command, options, function (err: Error, stdout: any, stderr: any) {
      if (err) {
        err.stdout = stdout
        err.stderr = stderr
        return reject(err)
      }

      resolve({
        stderr: stderr,
        stdout: stdout
      })
    })
  })
}

module.exports = execSh
