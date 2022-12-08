/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const base64VLQ: any = require("./base64-vlq");
const SourceNode: any = require("./SourceNode");
const CodeNode: any = require("./CodeNode");
const SourceListMap: any = require("./SourceListMap");

module.exports = function fromStringWithSourceMap(code: string, map: any): void {
	const sources: any = map.sources;
	const sourcesContent: string[] = map.sourcesContent;
	const mappings: string[] = map.mappings.split(";");
	const lines: string[] = code.split("\n");
	const nodes: any[] = [];
	let currentNode: any = null;
	let currentLine: number = 1;
	let currentSourceIdx: number = 0;
	let currentSourceNodeLine: any;
	function addCode(generatedCode: string): void {
		if(currentNode && currentNode instanceof CodeNode) {
			currentNode.addGeneratedCode(generatedCode);
		} else if(currentNode && currentNode instanceof SourceNode && !generatedCode.trim()) {
			currentNode.addGeneratedCode(generatedCode);
			currentSourceNodeLine++;
		} else {
			currentNode = new CodeNode(generatedCode);
			nodes.push(currentNode);
		}
	}
	function addSource(generatedCode: string, source: string, originalSource: boolean, linePosition: boolean): void {
		if(currentNode && currentNode instanceof SourceNode &&
			currentNode.source === source &&
			currentSourceNodeLine === linePosition
		) {
			currentNode.addGeneratedCode(generatedCode);
			currentSourceNodeLine++;
		} else {
			currentNode = new SourceNode(generatedCode, source, originalSource, linePosition);
			currentSourceNodeLine = linePosition + 1;
			nodes.push(currentNode);
		}
	}
	mappings.forEach(function(mapping: any, idx: number) {
		let line: string = lines[idx];
		if(typeof line === 'undefined') return;
		if(idx !== lines.length - 1) line += "\n";
		if(!mapping)
			return addCode(line);
		mapping = { value: 0, rest: mapping };
		let lineAdded: boolean = false;
		while(mapping.rest)
			lineAdded = processMapping(mapping, line, lineAdded) || lineAdded;
		if(!lineAdded)
			addCode(line);
	});
	if(mappings.length < lines.length) {
		let idx: number = mappings.length;
		while(!lines[idx].trim() && idx < lines.length-1) {
			addCode(lines[idx] + "\n");
			idx++;
		}
		addCode(lines.slice(idx).join("\n"));
	}
	return new SourceListMap(nodes);
	function processMapping(mapping: any, line: string, ignore: boolean): boolean {
		if(mapping.rest && mapping.rest[0] !== ",") {
			base64VLQ.decode(mapping.rest, mapping);
		}
		if(!mapping.rest)
			return false;
		if(mapping.rest[0] === ",") {
			mapping.rest = mapping.rest.substr(1);
			return false;
		}

		base64VLQ.decode(mapping.rest, mapping);
		const sourceIdx: string = mapping.value + currentSourceIdx;
		currentSourceIdx = sourceIdx;

		let linePosition: any;
		if(mapping.rest && mapping.rest[0] !== ",") {
			base64VLQ.decode(mapping.rest, mapping);
			linePosition = mapping.value + currentLine;
			currentLine = linePosition;
		} else {
			linePosition = currentLine;
		}

		if(mapping.rest) {
			const next: any = mapping.rest.indexOf(",");
			mapping.rest = next === -1 ? "" : mapping.rest.substr(next);
		}

		if(!ignore) {
			addSource(line, sources ? sources[sourceIdx] : null, sourcesContent ? sourcesContent[sourceIdx] : null, linePosition)
			return true;
		}
	}
};
