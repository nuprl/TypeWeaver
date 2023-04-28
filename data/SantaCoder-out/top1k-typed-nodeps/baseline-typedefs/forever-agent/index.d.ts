declare var util: any, Agent: any, net: any, tls: any, AgentSSL: any;
declare function getConnectionName(host: string, port: number): string;
declare function ForeverAgent(options: any): void;
declare namespace ForeverAgent {
    var SSL: typeof ForeverAgentSSL;
    var defaultMinSockets: number;
}
declare function ForeverAgentSSL(options: any): void;
declare function createConnectionSSL(port: number, host: string, options: any): any;
