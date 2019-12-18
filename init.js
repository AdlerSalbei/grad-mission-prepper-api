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

function createAndCopyFile (oldFile, newFile) {
  try {
    fs.copySync(oldFile, newFile);
  } catch (err) {
    console.error(err);
  };
};

function readDataFromFile (fileName) {
  let data = "";

  try {
    data = fs.readFileSync(fileName, 'utf-8');
  } catch (err) {
    console.error(err);
  };

  return data
};

function writeDataToFile (missionName, newData) {
  try {
    fs.writeFileSync(missionName, newData, 'utf-8');
  } catch (err) {
    console.error(err);
  };
};

function changeData (changes, data) {
  changes.forEach(function(element){
    let oldElement = element[0];
    let newElement = element[1];
    let className = element[2];
    let putBefore = element [3];
    
    switch (element.length) {
      case 1: 
        data = data + "\n" + oldElement;
        break;
      case 2:  
        let index = data.indexOf(oldElement);
    
        if (index !== -1 && oldElement !== "") {
          data = data.replace(oldElement, newElement);
        } else {
          data = data + "\n" + newElement;
        };
        break;
      case 3: {
        let indexClass = data.indexOf(className);
        let indexBraket = data.indexOf("}", indexClass);

        let firstString = data.substr(0, indexBraket);
        let lastString = data.substr(indexBraket, data.length);
        
        data = firstString + "\n" + newElement + "\n" + lastString;
        }
        break;
      case 4: {
        let indexClass = data.indexOf(className);
        let indexBraket = data.indexOf(putBefore, indexClass);

        let firstString = data.substr(0, indexBraket);
        let lastString = data.substr(indexBraket, data.length);
        
        data = firstString + "\n" + newElement + "\n" + lastString;
        }
        break;
    };
  });
  return data
};

function changeFile (fileName, newData) {
  let data = readDataFromFile(fileName);
  data = changeData(newData, data);

  writeDataToFile(fileName, data);
};

function useGradLoadout (missionName, descriptionChanges, userChanges) {
  createAndCopyDir('missionFile/template/modules/grad-loadout', missionName + '/node_modules/grad-loadout');

  descriptionChanges.push(
    [""],
    ["//GRAD LOADOUT ================================================================"],
    ["class Loadouts {"],
    ["    baseDelay = " + userChanges[0] + "; // minimum time to wait after connect before applying loadout"],
    ["    perPlayerDelay = " + userChanges[1] + "; // added random delay based on number of players"],
    ["    handleRadios = " + userChanges[2] + "; // if radios should be handled. defaults to 0"],
    ["    resetLoadout = " + userChanges[3] + "; // start with empty loadouts instead of modifying existing loadout"],  
    [" "],
    ["    class Faction {"],
    ["    };"]
    ["};"],
    ["", "    #include <node_modules\\grad-loadout\\CfgFunctions.hpp>", "CfgFunctions"],
    [""]
  );

  return descriptionChanges
};

function useGradCivs (missionName, descriptionChanges, userChanges) {
  createAndCopyDir('missionFile/template/modules/grad-civs', missionName + '/node_modules/grad-civs');
  createAndCopyFile('missionFile/template/modules/grad-civs-additionalFiles/fn_initCivs.sqf', missionName + '/functions/missionSetup/fn_initCivs.sqf');
  createAndCopyFile('missionFile/template/modules/grad-civs-additionalFiles/fn_initCivsEquip.sqf', missionName + '/functions/missionSetup/fn_initCivsEquip.sqf');

  changeFile(missionName + "/functions/missionSetup/cfgFunctions.hpp", [["", "        class initCivs {};", "class intro {};", "class"], ["", "        class initCivsEquip {preInit = 1;};", "class intro {}", "class"]]);
  changeFile(missionName + "/functions/missionSetup/fn_initMission.sqf", [["", "[] call grad_missionSetup_fnc_initCivs;", ";", "["]]);

  descriptionChanges.push(   
    ["//GRAD CIVS ================================================================"],
    ["class CfgGradCivs {"],
    ["    autoInit = " + userChanges[0] + ";"],
    ["    maxCivsOnFoot = " + userChanges[1] + ";"],
    ["    maxCivsResidents = " + userChanges[2] + ";"],
    ["    maxCivsInVehicles = " + userChanges[3] + ";"],  
    ["    spawnDistancesOnFoot[] = " + userChanges[4] + ";"],  
    ["    spawnDistancesInVehicles[] = " + userChanges[5] + ";"],  
    ["    debugCivState = " + userChanges[6] + ";"],  
    ["    debugFps = " + userChanges[7] + ";"],  
    ["    minCivUpdateTime = " + userChanges[8] + ";"],  
    ["    minFps = " + userChanges[9] + ";"],  
    ["    automaticVehicleGroupSize = " + userChanges[10] + ";"],  
    ["    exitOn = " + userChanges[11] + ";"],  
    ["    onSpawn = " + userChanges[12] + ";"],  
    ["    onHeldUp = " + userChanges[13] + ";"],  
    ["    backpackProbability = " + userChanges[14] + ";"],  
    [""],  
    ["    clothes[] = {"],  
    ["    };"], 
    [""], 
    ["    headgear[] = {"], 
    ["    };"],
    [""], 
    ["    faces[] = {"], 
    ["    };"],
    [""],  
    ["    goggles[] = {"], 
    ["    };"],
    [""], 
    ["    backpacks[] = {"], 
    ["    };"], 
    ["};"],
    ["", "    #include <node_modules\\grad-civs\\cfgFunctions.hpp>", "CfgFunctions"]
  );

  return descriptionChanges
};

function useGradFactions (missionName, descriptionChanges) {
  createAndCopyDir('missionFile/template/modules/grad-factions', missionName + '/node_modules/grad-factions');

  descriptionChanges.push(
  ["", "        #include <node_modules\grad-factions\loadouts.hpp>", "class Faction {"]
  );

  return descriptionChanges
};

function removeFolder (missionName) {
  try {
    fs.removeSync(missionName)
  } catch (err) {
    console.error(err)
  }
}

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

