//Import Functions
import writeDataToFile from "../functions/writeDataToFile";
import changeData from "../functions/changeData";
import changeFile from "../functions/changeFile";
import readDataFromFile from "../functions/readDataFromFile";
import createAndCopyDir from "../functions/createAndCopyDir";
import createAndCopyFile from "../functions/createAndCopyFile";
import removeFolder from "../functions/removeFolder";

export default function useGradFactions (missionName: string, descriptionChanges: any[]) {
    createAndCopyDir('missionFile/template/node_modules/grad-factions', missionName + '/node_modules/grad-factions');
  
    descriptionChanges.push(
        ["", "        #include <node_modules\grad-factions\loadouts.hpp>", "class Faction {"]
    );
  
    return descriptionChanges
};
  