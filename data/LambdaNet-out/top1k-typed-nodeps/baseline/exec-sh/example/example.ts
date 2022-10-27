const execSh: Function = require('../')

// run interactive bash shell
execSh('echo ola && bash', { cwd: '/home' }, function (err: Object) {
  if (err) {
    console.log('Exit code: ', err.code)
    return
  }

  // collect streams output
  execSh(['bash -c id', 'echo olaola >&2'], true,
    function (err: Function, stdout: String, stderr: Number) {
      console.log('error: ', err)
      console.log('stdout: ', stdout)
      console.log('stderr: ', stderr)
    })
})
