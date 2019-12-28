import fs from 'fs-extra';

export default function writeDataToFile (missionName: string, newData: string) {
    try {
        fs.writeFileSync(missionName, newData, 'utf-8');
    } catch (err) {
        console.error(err);
    };
};