import * as fs from 'fs-extra';

export default function createAndCopyDir (oldDirectory: string, newDirectory: string) {

    try {
        fs.ensureDirSync(newDirectory);
        try {
                fs.copySync(oldDirectory, newDirectory);
        } catch (err) {
                console.error(err);
        };
    } catch (err) {
        console.error(err)
    };

};