import fs from 'fs-extra';

export default function createAndCopyFile (oldFile: string, newFile: string) {
    try {
        fs.copySync(oldFile, newFile);
    } catch (err) {
        console.error(err);
    };
};