const PROMISE_SYMBOL = Symbol('promiseCallback')

function promiseCallback () {
    let resolve, reject
    function callback (err: any, ...args: any[]) {
        if (err) return reject(err)
        resolve(args.length > 1 ? args : args[0])
    }

    callback[PROMISE_SYMBOL] = new Promise((res, rej) => {
        resolve = res,
        reject = rej
    })

    return callback
}


export { promiseCallback, PROMISE_SYMBOL }