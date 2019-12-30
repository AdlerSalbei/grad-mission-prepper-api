import writeDataToFile from "./writeDataToFile";
import changeData from "./changeData";
import readDataFromFile from "./readDataFromFile";

export default function changeFile (fileName: string, newData: any[]) {
    let data = readDataFromFile(fileName);
    data = changeData(newData, data);
  
    writeDataToFile(fileName, data);
};