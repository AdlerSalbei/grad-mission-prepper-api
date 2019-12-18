function createAndCopyFile (oldFile, newFile) {
    try {
        fs.copySync(oldFile, newFile);
    } catch (err) {
        console.error(err);
    };
};