export default ipRegex;
declare function ipRegex(options: any): RegExp;
declare namespace ipRegex {
    function v4(options: any): RegExp;
    function v6(options: any): RegExp;
}
