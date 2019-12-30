//Import Functions
import writeDataToFile from "./functions/writeDataToFile";
import changeData from "./functions/changeData";
import readDataFromFile from "./functions/readDataFromFile";
import createAndCopyDir from "./functions/createAndCopyDir";
//import removeFolder from "./src/functions/removeFolder";

//Import module templates
import useGradLoadout from "./templates/grad-loadout";
import useGradFactions from "./templates/grad-factions";
import useGradCivs from "./templates/grad-civs";
//import useGradCrows from "./src/templates/grad-crows";
//import useGradCfortifications from "./src/templates/grad-fortifications";
//import useGradIslandconfig from "./src/templates/grad-islandconfig";
//import useGradLeaveNotes from "./src/templates/grad-leaveNotes";
//import useGradmakeFire from "./src/templates/grad-makeFire";
//import useGradScoreboard from "./src/templates/grad-scoreboard";

let descriptionChanges = [];
let missionName = "CO_Template.VR";
let missionPath = "missionFile/" + missionName;
let data = "";
let gradLoadoutChanges = ["10", "1", "0", "1"];
let gradCivsChanges = ["1", "20", "30", "10", "{1000, 4500}", "{1000, 4500}", "0", "0", "3", "35", "1", "''", "''", "0.5"];

createAndCopyDir('missionFile/template/CO_Template.VR', missionPath);

data = readDataFromFile(missionPath + "/description.ext");

descriptionChanges = useGradLoadout(missionPath, descriptionChanges, gradLoadoutChanges);
descriptionChanges = useGradFactions(missionPath, descriptionChanges);
descriptionChanges = useGradCivs(missionPath, descriptionChanges, gradCivsChanges);

data = changeData(descriptionChanges, data);

writeDataToFile(missionPath + "/description.ext", data);
//removeFolder(missionPath)
