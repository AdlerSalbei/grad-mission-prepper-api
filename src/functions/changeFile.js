function changeFile (fileName, newData) {
    let data = readDataFromFile(fileName);
    data = changeData(newData, data);
  
    writeDataToFile(fileName, data);
};