export default cs;
declare namespace cs {
    function get(string: any): {
        model: string;
        value: any;
    };
    namespace get {
        function rgb(string: any): number[];
        function hsl(string: any): number[];
        function hwb(string: any): number[];
    }
    namespace to {
        function hex(...args: any[]): string;
        function rgb(...args: any[]): string;
        namespace rgb {
            function percent(...args: any[]): string;
        }
        function hsl(...args: any[]): string;
        function hwb(...args: any[]): string;
        function keyword(rgb: any): any;
    }
}
