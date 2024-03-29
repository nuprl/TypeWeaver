import path from 'node:path';

export default function isPathInside(childPath: Path,  parentPath: Path) {
	const relation = path.relative(parentPath, childPath);

	return Boolean(
		relation &&
		relation !== '..' &&
		!relation.startsWith(`..${path.sep}`) &&
		relation !== path.resolve(childPath)
	);
}