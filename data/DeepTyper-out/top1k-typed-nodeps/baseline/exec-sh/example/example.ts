const execSh: any = require('../')

// run interactive bash shell
execSh('echo ola && bash', { cwd: '/home' }, function (err: any) {
  if (err) {
    console.log('Exit code: ', err.code)
    return
  }

  // collect streams output
  execSh(['bash -c id', 'echo olaola >&2'], true,
    function (err: any, stdout: any, stderr: any) {
      console.log('error: ', err)
      console.log('stdout: ', stdout)
      console.log('stderr: ', stderr)
    })
})
