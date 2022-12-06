/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const base64VLQ: any = require("./base64-vlq");
const getNumberOfLines: any = require("./helpers").getNumberOfLines;
const getUnfinishedLine: any = require("./helpers").getUnfinishedLine;

const LINE_MAPPING: RegExp = ";AAAA";

class SingleLineNode {

	constructor(generatedCode, source, originalSource, line) {
		this.generatedCode = generatedCode;
		this.originalSource = originalSource;
		this.source = source;
		this.line = line || 1;
		this._numberOfLines = getNumberOfLines(this.generatedCode);
		this._endsWithNewLine = generatedCode[generatedCode.length - 1] === "\n";
	}

	clone() {
		return new SingleLineNode(this.generatedCode, this.source, this.originalSource, this.line);
	}

	getGeneratedCode() {
		return this.generatedCode;
	}

	getMappings(mappingsContext) {
		if(!this.generatedCode)
			return "";
		const lines: string[] = this._numberOfLines;
		const sourceIdx: string = mappingsContext.ensureSource(this.source, this.originalSource);
		let mappings: string = "A"; // generated column 0
		if(mappingsContext.unfinishedGeneratedLine)
			mappings = "," + base64VLQ.encode(mappingsContext.unfinishedGeneratedLine);
		mappings += base64VLQ.encode(sourceIdx - mappingsContext.currentSource); // source index
		mappings += base64VLQ.encode(this.line - mappingsContext.currentOriginalLine); // original line index
		mappings += "A"; // original column 0
		mappingsContext.currentSource = sourceIdx;
		mappingsContext.currentOriginalLine = this.line;
		const unfinishedGeneratedLine: string = mappingsContext.unfinishedGeneratedLine = getUnfinishedLine(this.generatedCode)
		mappings += Array(lines).join(LINE_MAPPING);
		if(unfinishedGeneratedLine === 0) {
			mappings += ";";
		} else {
			if(lines !== 0)
				mappings += LINE_MAPPING;
		}
		return mappings;
	}

	getNormalizedNodes() {
		return [this];
	}

	mapGeneratedCode(fn) {
		const generatedCode: string = fn(this.generatedCode);
		return new SingleLineNode(generatedCode, this.source, this.originalSource, this.line);
	}

	merge(otherNode) {
		if(otherNode instanceof SingleLineNode) {
			return this.mergeSingleLineNode(otherNode);
		}
		return false;
	}

	mergeSingleLineNode(otherNode) {
		if(this.source === otherNode.source &&
			this.originalSource === otherNode.originalSource) {
			if(this.line === otherNode.line) {
				this.generatedCode += otherNode.generatedCode;
				this._numberOfLines += otherNode._numberOfLines;
				this._endsWithNewLine = otherNode._endsWithNewLine;
				return this;
			} else if(this.line + 1 === otherNode.line && 
				this._endsWithNewLine &&
				this._numberOfLines === 1 && 
				otherNode._numberOfLines <= 1) {
				return new SourceNode(this.generatedCode + otherNode.generatedCode, this.source, this.originalSource, this.line);
			}
		}
		return false;
	}
}

module.exports = SingleLineNode;

const SourceNode: any = require("./SourceNode"); // circular dependency
