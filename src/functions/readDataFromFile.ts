import * as fs from 'fs-extra';

export default function readDataFromFile (fileName: string) {
    let data = "";
  
    try {
        data = fs.readFileSync(fileName, 'utf-8');
    } catch (err) {
        console.error(err);
    };
  
    return data
  };