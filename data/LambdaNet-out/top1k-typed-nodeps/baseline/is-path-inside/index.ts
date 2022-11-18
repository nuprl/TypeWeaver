import path from 'node:path';

export default function isPathInside(childPath: string, parentPath: string): boolean {
	const relation: number = path.relative(parentPath, childPath);

	return Boolean(
		relation &&
		relation !== '..' &&
		!relation.startsWith(`..${path.sep}`) &&
		relation !== path.resolve(childPath)
	);
}
