/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import CodeNode from './CodeNode';
import SourceNode from './SourceNode';
import MappingsContext from './MappingsContext';
import { getNumberOfLines } from './helpers';

class SourceListMap {

	constructor(generatedCode, source, originalSource) {
		if(Array.isArray(generatedCode)) {
			this.children = generatedCode;
		} else {
			this.children = [];
			if(generatedCode || source)
				this.add(generatedCode, source, originalSource);
		}
	}

	add(generatedCode, source, originalSource) {
		if(typeof generatedCode === "string") {
			if(source) {
				this.children.push(new SourceNode(generatedCode, source, originalSource));
			} else if(this.children.length > 0 && this.children[this.children.length - 1] instanceof CodeNode) {
				this.children[this.children.length - 1].addGeneratedCode(generatedCode);
			} else {
				this.children.push(new CodeNode(generatedCode));
			}
		} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
			this.children.push(generatedCode);
		} else if(generatedCode.children) {
			generatedCode.children.forEach(function(sln: String) {
				this.children.push(sln);
			}, this);
		} else {
			throw new Error("Invalid arguments to SourceListMap.protfotype.add: Expected string, Node or SourceListMap");
		}
	};

	preprend(generatedCode, source, originalSource) {
		if(typeof generatedCode === "string") {
			if(source) {
				this.children.unshift(new SourceNode(generatedCode, source, originalSource));
			} else if(this.children.length > 0 && this.children[this.children.length - 1].preprendGeneratedCode) {
				this.children[this.children.length - 1].preprendGeneratedCode(generatedCode);
			} else {
				this.children.unshift(new CodeNode(generatedCode));
			}
		} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
			this.children.unshift(generatedCode);
		} else if(generatedCode.children) {
			generatedCode.children.slice().reverse().forEach(function(sln: String) {
				this.children.unshift(sln);
			}, this);
		} else {
			throw new Error("Invalid arguments to SourceListMap.protfotype.prerend: Expected string, Node or SourceListMap");
		}
	};

	mapGeneratedCode(fn) {
		const normalizedNodes: Array = [];
		this.children.forEach(function(sln: CodeNode) {
			sln.getNormalizedNodes().forEach(function(newNode: SourceNode) {
				normalizedNodes.push(newNode);
			});
		});
		const optimizedNodes: Array = [];
		normalizedNodes.forEach(function(sln: SourceNode) {
			sln = sln.mapGeneratedCode(fn);
			if(optimizedNodes.length === 0) {
				optimizedNodes.push(sln);
			} else {
				const last: CodeNode = optimizedNodes[optimizedNodes.length - 1];
				const mergedNode: String = last.merge(sln);
				if(mergedNode) {
					optimizedNodes[optimizedNodes.length - 1] = mergedNode;
				} else {
					optimizedNodes.push(sln);
				}
			}
		});
		return new SourceListMap(optimizedNodes);
	};

	toString() {
		return this.children.map(function(sln: CodeNode) {
			return sln.getGeneratedCode();
		}).join("");
	};

	toStringWithSourceMap(options) {
		const mappingsContext: SingleLineNode = new MappingsContext();
		const source: String = this.children.map(function(sln: CodeNode) {
			return sln.getGeneratedCode();
		}).join("");
		const mappings: String = this.children.map(function(sln: CodeNode) {
			return sln.getMappings(mappingsContext);
		}).join("");
		const arrays: Object = mappingsContext.getArrays();
		return {
			source,
			map: {
				version: 3,
				file: options && options.file,
				sources: arrays.sources,
				sourcesContent: mappingsContext.hasSourceContent ? arrays.sourcesContent : undefined,
				mappings: mappings
			}
		};
	}
}

export default SourceListMap;
