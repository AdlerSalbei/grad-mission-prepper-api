function removeFolder (missionName) {
    try {
        fs.removeSync(missionName)
    } catch (err) {
        console.error(err)
    };
};