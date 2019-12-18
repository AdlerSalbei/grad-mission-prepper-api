function createAndCopyDir (oldDirectory, newDirectory) {
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