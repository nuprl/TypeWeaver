/// <reference types="node" />
export default function isInteractive({ stream }?: {
    stream?: NodeJS.WriteStream & {
        fd: 1;
    };
}): boolean;
