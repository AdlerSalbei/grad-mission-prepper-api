const http = require('http');
const fs = require('fs-extra');

let descriptionChanges = [];
let missionName = "CO_Template.VR";
let missionPath = "missionFile/" + missionName;
let data = "";
let gradLoadoutChanges = ["10", "1", "0", "1"];
let gradCivsChanges = ["1", "20", "30", "10", "{1000,4500}", "{1000,4500}", "0", "0", "3", "35", "1", "''", "''", "0.5"];

createAndCopyDir('missionFile/template/CO_Template.VR', missionPath);

data = readDataFromFile(missionPath + "/description.ext");

descriptionChanges = useGradLoadout(missionPath, descriptionChanges, gradLoadoutChanges);
descriptionChanges = useGradFactions(missionPath, descriptionChanges);
descriptionChanges = useGradCivs(missionPath, descriptionChanges, gradCivsChanges);

data = changeData(descriptionChanges, data);

writeDataToFile(missionPath + "/description.ext", data);
//removeFolder(missionPath)
