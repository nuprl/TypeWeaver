/// <reference types="node" />
export default function patchFs(vol: any, fs?: typeof import("fs")): () => void;
