import cp from 'child_process';

const defSpawnOptions = { stdio: 'inherit' }

/**
 * @summary Get shell program meta for current platform
 * @private
 * @returns {Object}
 */
function getShell () {
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
function execSh (command: string | string[],  options: ExecOptions,  callback: ExecCallback) {
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

  let child
  let stdout = ''
  let stderr = ''
  const shell = getShell()

  try {
    child = cp.spawn(shell.cmd, [shell.arg, command], options)
  } catch (e) {
    callback(e, stdout, stderr)
    return
  }

  if (child.stdout) {
    child.stdout.on('data', function (data: any) {
      stdout += data
    })
  }

  if (child.stderr) {
    child.stderr.on('data', function (data: any) {
      stderr += data
    })
  }

  child.on('close', function (code: number) {
    if (code) {
      const e = new Error('Shell command exit with non zero code: ' + code)
      e.code = code
      callback(e, stdout, stderr)
    } else {
      callback(null, stdout, stderr)
    }
  })

  return child
}

execSh.promise = function (command: Command,  options: any) {
  return new Promise(function (resolve: any,  reject: any) {
    execSh(command, options, function (err: Error,  stdout: Buffer,  stderr: Buffer) {
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

export default execSh;