/// <reference types="node" />
export class CoverageInstrumenter {
    session: Session;
    postSession: Function;
    startInstrumenting(): Promise<void>;
    stopInstrumenting(): Promise<any>;
}
import { Session } from "inspector";
