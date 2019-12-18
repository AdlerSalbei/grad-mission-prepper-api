const http = require('http');
const fs = require('fs-extra');
/*
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

let descriptionChanges = [];
let missionName = "missionFile/CO_Template.VR";
let data = "";
let gradLoadoutChanges = ["10", "1", "0", "1"];
let gradCivsChanges = ["1", "20", "30", "10", "{1000,4500}", "{1000,4500}", "0", "0", "3", "35", "1", "''", "''", "0.5"];

createAndCopyDir('missionFile/template/CO_Template.VR', missionName);

data = readDataFromFile(missionName + "/description.ext");

descriptionChanges = useGradLoadout(missionName, descriptionChanges, gradLoadoutChanges);
descriptionChanges = useGradFactions(missionName, descriptionChanges);
descriptionChanges = useGradCivs(missionName, descriptionChanges, gradCivsChanges);

data = changeData(descriptionChanges, data);

writeDataToFile(missionName + "/description.ext", data);
//removeFolder(missionName)
