import queue from './queue.js'
import Heap from './internal/Heap.js'

/**
 * The same as [async.queue]{@link module:ControlFlow.queue} only tasks are assigned a priority and
 * completed in ascending priority order.
 *
 * @name priorityQueue
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @see [async.queue]{@link module:ControlFlow.queue}
 * @category Control Flow
 * @param {AsyncFunction} worker - An async function for processing a queued task.
 * If you want to handle errors from an individual task, pass a callback to
 * `q.push()`.
 * Invoked with (task, callback).
 * @param {number} concurrency - An `integer` for determining how many `worker`
 * functions should be run in parallel.  If omitted, the concurrency defaults to
 * `1`.  If the concurrency is `0`, an error is thrown.
 * @returns {module:ControlFlow.QueueObject} A priorityQueue object to manage the tasks. There are three
 * differences between `queue` and `priorityQueue` objects:
 * * `push(task, priority, [callback])` - `priority` should be a number. If an
 *   array of `tasks` is given, all tasks will be assigned the same priority.
 * * `pushAsync(task, priority, [callback])` - the same as `priorityQueue.push`,
 *   except this returns a promise that rejects if an error occurs.
 * * The `unshift` and `unshiftAsync` methods were removed.
 */
export default function(worker: Function, concurrency: number) {
    // Start with a normal queue
    var q = queue(worker, concurrency);

    var {
        push,
        pushAsync
    } = q;

    q._tasks = new Heap();
    q._createTaskItem = ({data, priority}, callback) => {
        return {
            data,
            priority,
            callback
        };
    };

    function createDataItems(tasks: any[], priority: number) {
        if (!Array.isArray(tasks)) {
            return {data: tasks, priority};
        }
        return tasks.map(data => { return {data, priority}; });
    }

    // Override push to accept second parameter representing priority
    q.push = function(data: any[], priority = 0: any, callback: Function) {
        return push(createDataItems(data, priority), callback);
    };

    q.pushAsync = function(data: any, priority = 0: number, callback: Function) {
        return pushAsync(createDataItems(data, priority), callback);
    };

    // Remove unshift functions
    delete q.unshift;
    delete q.unshiftAsync;

    return q;
}