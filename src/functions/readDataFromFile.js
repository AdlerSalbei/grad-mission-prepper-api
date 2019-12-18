function readDataFromFile (fileName) {
    let data = "";
  
    try {
        data = fs.readFileSync(fileName, 'utf-8');
    } catch (err) {
        console.error(err);
    };
  
    return data
  };