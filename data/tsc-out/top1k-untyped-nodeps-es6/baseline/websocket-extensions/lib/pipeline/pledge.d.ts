export default Pledge;
declare class Pledge {
    then(callback: any): void;
    done(): void;
    _complete: boolean;
}
