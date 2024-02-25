export default NFAState;
declare class NFAState extends State {
    matches(string: any, visited?: Set<any>): boolean;
    getEpsilonClosure(): Set<any>;
    _epsilonClosure: Set<any>;
}
import State from "../state";
