/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const base64VLQ: any = require("./base64-vlq");
const getNumberOfLines: any = require("./helpers").getNumberOfLines;
const getUnfinishedLine: any = require("./helpers").getUnfinishedLine;

const LINE_MAPPING: RegExp = ";AACA";

class SourceNode {

	constructor(generatedCode, source, originalSource, startingLine) {
		this.generatedCode = generatedCode;
		this.originalSource = originalSource;
		this.source = source;
		this.startingLine = startingLine || 1;
		this._numberOfLines = getNumberOfLines(this.generatedCode);
		this._endsWithNewLine = generatedCode[generatedCode.length - 1] === "\n";
	}

	clone() {
		return new SourceNode(this.generatedCode, this.source, this.originalSource, this.startingLine);
	}

	getGeneratedCode() {
		return this.generatedCode;
	}

	addGeneratedCode(code) {
		this.generatedCode += code;
		this._numberOfLines += getNumberOfLines(code);
		this._endsWithNewLine = code[code.length - 1] === "\n";
	}

	getMappings(mappingsContext) {
		if(!this.generatedCode)
			return "";
		const lines: number = this._numberOfLines;
		const sourceIdx: string = mappingsContext.ensureSource(this.source, this.originalSource);
		let mappings: string = "A"; // generated column 0
		if(mappingsContext.unfinishedGeneratedLine)
			mappings = "," + base64VLQ.encode(mappingsContext.unfinishedGeneratedLine);
		mappings += base64VLQ.encode(sourceIdx - mappingsContext.currentSource); // source index
		mappings += base64VLQ.encode(this.startingLine - mappingsContext.currentOriginalLine); // original line index
		mappings += "A"; // original column 0
		mappingsContext.currentSource = sourceIdx;
		mappingsContext.currentOriginalLine = this.startingLine + lines - 1;
		const unfinishedGeneratedLine: string = mappingsContext.unfinishedGeneratedLine = getUnfinishedLine(this.generatedCode)
		mappings += Array(lines).join(LINE_MAPPING);
		if(unfinishedGeneratedLine === 0) {
			mappings += ";";
		} else {
			if(lines !== 0) {
				mappings += LINE_MAPPING;
			}
			mappingsContext.currentOriginalLine++;
		}
		return mappings;
	}

	mapGeneratedCode(fn) {
		throw new Error("Cannot map generated code on a SourceMap. Normalize to SingleLineNode first.");
	}

	getNormalizedNodes() {
		var results: any[] = [];
		var currentLine: number = this.startingLine;
		var generatedCode: string = this.generatedCode;
		var index: number = 0;
		var indexEnd: number = generatedCode.length;
		while(index < indexEnd) {
			// get one generated line
			var nextLine: any = generatedCode.indexOf("\n", index) + 1;
			if(nextLine === 0) nextLine = indexEnd;
			var lineGenerated: boolean = generatedCode.substr(index, nextLine - index);

			results.push(new SingleLineNode(lineGenerated, this.source, this.originalSource, currentLine));

			// move cursors
			index = nextLine;
			currentLine++;
		}
		return results;
	}

	merge(otherNode) {
		if(otherNode instanceof SourceNode) {
			return this.mergeSourceNode(otherNode);
		} else if(otherNode instanceof SingleLineNode) {
			return this.mergeSingleLineNode(otherNode);
		}
		return false;
	}

	mergeSourceNode(otherNode) {
		if(this.source === otherNode.source &&
			this._endsWithNewLine &&
			this.startingLine + this._numberOfLines === otherNode.startingLine) {
			this.generatedCode += otherNode.generatedCode;
			this._numberOfLines += otherNode._numberOfLines;
			this._endsWithNewLine = otherNode._endsWithNewLine;
			return this;
		}
		return false;
	}

	mergeSingleLineNode(otherNode) {
		if(this.source === otherNode.source &&
			this._endsWithNewLine &&
			this.startingLine + this._numberOfLines === otherNode.line &&
			otherNode._numberOfLines <= 1) {
			this.addSingleLineNode(otherNode);
			return this;
		}
		return false;
	}

	addSingleLineNode(otherNode) {
		this.generatedCode += otherNode.generatedCode;
		this._numberOfLines += otherNode._numberOfLines
		this._endsWithNewLine = otherNode._endsWithNewLine;
	}
}

module.exports = SourceNode;
const SingleLineNode: any = require("./SingleLineNode"); // circular dependency
