export = ExtendMinipass;
declare class ExtendMinipass extends Minipass {
    write(data: any, encoding: any): any;
}
import Minipass = require("../..");
