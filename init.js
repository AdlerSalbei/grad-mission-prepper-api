const http = require('http');
const fs = require('fs-extra');
/*
http.createServer(function (req, res) {
  fs.readFile('description.ext', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
*/

let descriptionChanges = [];
let missionName = "missionFile/CO_Template.VR";

function createAndCopy (oldDirectory, newDirectory) {
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

function readDescription (missionName) {
  let data = "";

  try {
    data = fs.readFileSync(missionName + "/description.ext", 'utf-8');
  } catch (err) {
    console.error(err);
  };

  return data
};

function writeDescription (missionName, newData) {
  try {
    fs.writeFileSync(missionName + "/description.ext", newData, 'utf-8');
  } catch (err) {
    console.error(err);
  };
};

function changeDescription (values, data) {
  values.forEach(function(element){
    switch (element.length) {
      case 1: 
        let newElement = element[0];
        data = data + "\n" + newElement;
        break;
      case 2: 
        let oldElement = element[0];
        let newElement = element[1];
        let index = data.indexOf(oldElement);
    
        if (index !== -1 && oldElement !== "") {
          data = data.replace(oldElement, newElement);
        } else {
          data = data + "\n" + newElement;
        };
        break;
      case 3: 
        let newElement = element[1];
        let className = element[2];
        
        let indexClass = data.indexOf(className) + className.length;
        let indexBraket = data.indexOf("}", indexClass);

        let firstString = data.substr(0, indexClass);
        let lastString = data.substr(indexClass, data.length);

        data = firstString + "\n" + newElement + "\n" + lastString;

        break;
    };
  });
  return data
};

function useGradLoadout (missionName, descriptionChanges) {
  createAndCopy('missionFile/template/modules/grad-loadout', missionName + '/node_modules/grad-loadout');

  descriptionChanges.push(
    [""],
    ["class Loadouts {"],
    ["    baseDelay = 10; // minimum time to wait after connect before applying loadout"],
    ["    perPlayerDelay = 1; // added random delay based on number of players"],
    ["    handleRadios = 0; // if radios should be handled. defaults to 0"],
    ["    resetLoadout = 1; // start with empty loadouts instead of modifying existing loadout"],  
    ["};"],
    ["", "    #include <node_modules\grad-loadout\CfgFunctions.hpp>", "CfgFunctions"]

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

createAndCopy('missionFile/template/CO_Template.VR', missionName);
let data = readDescription(missionName);
descriptionChanges = useGradLoadout(missionName, descriptionChanges);
data = changeDescription(descriptionChanges, data);

writeDescription (missionName, data)
//removeFolder(missionName)

