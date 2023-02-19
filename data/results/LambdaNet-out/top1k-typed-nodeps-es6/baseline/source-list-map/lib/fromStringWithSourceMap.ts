/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import base64VLQ from './base64-vlq';
import SourceNode from './SourceNode';
import CodeNode from './CodeNode';
import SourceListMap from './SourceListMap';

export default function fromStringWithSourceMap(code: string, map: object): Promise {
	const sources: object = map.sources;
	const sourcesContent: object = map.sourcesContent;
	const mappings: any[] = map.mappings.split(";");
	const lines: any[] = code.split("\n");
	const nodes: any[] = [];
	let currentNode: SourceNode = null;
	let currentLine: number = 1;
	let currentSourceIdx: number = 0;
	let currentSourceNodeLine: number;
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
	function addSource(generatedCode: string, source: SourceNode, originalSource: SourceNode, linePosition: number): void {
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
	mappings.forEach(function(mapping: object, idx: number) {
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
	function processMapping(mapping: object, line: SingleLineNode, ignore: boolean): boolean {
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
		const sourceIdx: number = mapping.value + currentSourceIdx;
		currentSourceIdx = sourceIdx;

		let linePosition: number;
		if(mapping.rest && mapping.rest[0] !== ",") {
			base64VLQ.decode(mapping.rest, mapping);
			linePosition = mapping.value + currentLine;
			currentLine = linePosition;
		} else {
			linePosition = currentLine;
		}

		if(mapping.rest) {
			const next: number = mapping.rest.indexOf(",");
			mapping.rest = next === -1 ? "" : mapping.rest.substr(next);
		}

		if(!ignore) {
			addSource(line, sources ? sources[sourceIdx] : null, sourcesContent ? sourcesContent[sourceIdx] : null, linePosition)
			return true;
		}
	}
};
