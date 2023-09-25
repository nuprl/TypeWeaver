import path from 'path';

export default function insertFilename() {
    return {
        name: "insert-filename",
        version: "0.0.1",
        transform(code, id) {
            if (id.startsWith("\x00") || id.endsWith("commonjs-entry")) {
                return null;
            }

            const filename = id.replace(process.cwd(), "").replace(/^\//, "");

            // This probably messes up sourcemaps, but we don't care.
            // If we do, maybe use the magic-string package.
            return "// FILE: " + filename + "\n" + code;
        }
    };
}
