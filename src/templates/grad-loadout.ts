//Import Functions
import writeDataToFile from "../functions/writeDataToFile";
import changeData from "../functions/changeData";
import changeFile from "../functions/changeFile";
import readDataFromFile from "../functions/readDataFromFile";
import createAndCopyDir from "../functions/createAndCopyDir";
import createAndCopyFile from "../functions/createAndCopyFile";
import removeFolder from "../functions/removeFolder";

export default function useGradLoadout (missionName: string, descriptionChanges: string[][], userChanges: string[]) {
    createAndCopyDir('missionFile/template/node_modules/grad-loadout', missionName + '/node_modules/grad-loadout');
  
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
      ["    };"],
      ["};"],
      ["", "    #include <node_modules\\grad-loadout\\CfgFunctions.hpp>", "CfgFunctions"],
      [""]
    );
  
    return descriptionChanges
};