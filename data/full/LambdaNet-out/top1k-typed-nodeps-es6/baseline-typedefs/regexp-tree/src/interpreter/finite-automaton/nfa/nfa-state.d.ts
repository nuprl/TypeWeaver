import State from '../state';
declare class NFAState extends State {
    matches(string: any, visited?: Set<unknown>): boolean;
    getEpsilonClosure(): any;
}
export default NFAState;
