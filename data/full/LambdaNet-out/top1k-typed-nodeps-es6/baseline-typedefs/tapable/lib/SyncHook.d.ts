import Hook from './Hook';
declare function SyncHook(args?: string, name?: string): Hook;
declare namespace SyncHook {
    var prototype: any;
}
export default SyncHook;
