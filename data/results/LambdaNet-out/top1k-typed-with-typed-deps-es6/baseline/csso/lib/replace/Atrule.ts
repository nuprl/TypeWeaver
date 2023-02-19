import { keyword as resolveKeyword } from 'css-tree';
import compressKeyframes from './atrule/keyframes.js';

export default function(node: object) {
    // compress @keyframe selectors
    if (resolveKeyword(node.name).basename === 'keyframes') {
        compressKeyframes(node);
    }
};
