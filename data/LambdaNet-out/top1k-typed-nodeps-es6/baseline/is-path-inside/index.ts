import path from 'node:path';

export default function isPathInside(childPath: String, parentPath: String): Boolean {
	const relation: Number = path.relative(parentPath, childPath);

	return Boolean(
		relation &&
		relation !== '..' &&
		!relation.startsWith(`..${path.sep}`) &&
		relation !== path.resolve(childPath)
	);
}
