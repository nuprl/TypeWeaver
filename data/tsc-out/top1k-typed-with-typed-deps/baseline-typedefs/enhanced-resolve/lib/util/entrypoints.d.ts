export function processExportsField(exportsField: ExportsField): FieldProcessor;
export function processImportsField(importsField: ImportsField): FieldProcessor;
export type DirectMapping = string | (string | ConditionalMapping)[];
export type ConditionalMapping = {
    [k: string]: MappingValue;
};
export type MappingValue = ConditionalMapping | DirectMapping | null;
export type ExportsField = Record<string, MappingValue> | ConditionalMapping | DirectMapping;
export type ImportsField = Record<string, MappingValue>;
export type PathTreeNode = {
    children: Map<string, PathTreeNode> | null;
    folder: MappingValue;
    wildcards: Map<string, MappingValue> | null;
    files: Map<string, MappingValue>;
};
export type FieldProcessor = (request: string, conditionNames: Set<string>) => string[];
