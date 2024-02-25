import jsonFile = require("jsonfile");
export const readJson: typeof jsonFile.readFile;
export const readJsonSync: typeof jsonFile.readFileSync;
export const writeJson: typeof jsonFile.writeFile;
export const writeJsonSync: typeof jsonFile.writeFileSync;
