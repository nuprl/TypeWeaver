import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import * as path from "path";
import { Node, Project, SourceFile } from "ts-morph";
// import { ArrowFunction, FunctionDeclaration, FunctionExpression, Identifier,
//          Node, ParameterDeclaration, SyntaxKind,
//          VariableDeclaration, VariableDeclarationKind, VariableStatement } from "ts-morph";

interface Record {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    typePrediction: string;
}

class TypePredictions {
    private readonly debug: boolean;
    private readonly records: Record[];

    constructor(filename: string, debug: boolean = false) {
        this.debug = debug
        const contents: Buffer = readFileSync(filename);
        this.records = parse(contents, {
            // The columns are:
            //   start_row, start_col, end_row, end_col, type1, prob1, ...
            columns: ["startRow", "startCol", "endRow", "endCol", "typePrediction"],
            quote: false,
            relax_column_count_more: true,
            trim: true
        });

        if (this.debug) {
            this.debugPrint();
        }
    }

    // TODO: some kind of lookup method, maybe convert records array into a dictionary

    private debugPrint(): void {
        for (const r of this.records) {
            const start: string = "(" + r.startRow + "," + r.startCol + ")";
            const end: string = "(" + r.endRow + "," + r.endCol + ")";
            console.log(start + "-" + end + ": " + r.typePrediction);
        }
    }
}

export default class LambdaNet {
    private readonly debug: boolean;
    private readonly predictions: TypePredictions;

    private readonly project: Project;
    private readonly sourceFile: SourceFile;
    private outputFile: SourceFile;

    constructor(jsFilename: string, csvFilename: string, debug: boolean = false) {
        this.debug = debug;

        // Read and parse unannotated JavaScript source.
        // Prepare TypeScript output file by copying JS file.
        this.project = new Project();
        this.sourceFile = this.project.addSourceFileAtPath(jsFilename);
        this.outputFile = this.sourceFile.copy(path.parse(jsFilename).name + ".ts", { overwrite: true });
        this.predictions = new TypePredictions(csvFilename, debug);
    }

    // TODO: traverse the AST
    private traverse = (node: Node): void => {
    }

    public run() {
        // Run type insertion
        this.traverse(this.outputFile);

        if (this.debug) {
            // Print annotated code to console
            //console.log(this.outputFile.getFullText());
        }

        // Save the modified file
        //this.outputFile.saveSync();
    }
}
