export default dangerous;
declare namespace dangerous {
    namespace Buffer {
        function allocUnsafe(size: any): any;
        function allocUnsafeSlow(size: any): any;
    }
}
