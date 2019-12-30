//Import Functions
import writeDataToFile from "../functions/writeDataToFile";
import changeData from "../functions/changeData";
import changeFile from "../functions/changeFile";
import readDataFromFile from "../functions/readDataFromFile";
import createAndCopyDir from "../functions/createAndCopyDir";
import createAndCopyFile from "../functions/createAndCopyFile";
import removeFolder from "../functions/removeFolder";

export default function useGradCivs (missionName: string, descriptionChanges: string[][], userChanges: string[]) {
    createAndCopyDir('missionFile/template/node_modules/grad-civs', missionName + '/node_modules/grad-civs');
    createAndCopyFile('missionFile/template/node_modules/grad-additionalFiles/fn_initCivs.sqf', missionName + '/functions/missionSetup/fn_initCivs.sqf');
    createAndCopyFile('missionFile/template/node_modules/grad-additionalFiles/fn_initCivsEquip.sqf', missionName + '/functions/missionSetup/fn_initCivsEquip.sqf');
  
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