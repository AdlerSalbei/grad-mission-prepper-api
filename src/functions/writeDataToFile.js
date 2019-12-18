function writeDataToFile (missionName, newData) {
    try {
        fs.writeFileSync(missionName, newData, 'utf-8');
    } catch (err) {
        console.error(err);
    };
};