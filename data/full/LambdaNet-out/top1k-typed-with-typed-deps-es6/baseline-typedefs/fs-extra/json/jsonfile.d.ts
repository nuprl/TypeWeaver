import jsonFile from 'jsonfile';
declare const _default: {
    readJson: typeof jsonFile.readFile;
    readJsonSync: typeof jsonFile.readFileSync;
    writeJson: typeof jsonFile.writeFile;
    writeJsonSync: typeof jsonFile.writeFileSync;
};
export default _default;
