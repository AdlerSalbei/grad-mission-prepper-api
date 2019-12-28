import fs from 'fs-extra';

export default function removeFolder (missionName: string) {
    try {
        fs.removeSync(missionName)
    } catch (err) {
        console.error(err)
    };
};