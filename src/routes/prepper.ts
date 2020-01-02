import { Router } from 'express';
//Import Functions
import writeDataToFile from "../functions/writeDataToFile";
import changeData from "../functions/changeData";
import readDataFromFile from "../functions/readDataFromFile";
import createAndCopyDir from "../functions/createAndCopyDir";
import removeFolder from "../functions/removeFolder";
import zipFolder from "../functions/zipFolder";

//Import module templates
import useGradLoadout from "../templates/grad-loadout";
import useGradFactions from "../templates/grad-factions";
import useGradCivs from "../templates/grad-civs";
//import useGradCrows from "../templates/grad-crows";
//import useGradCfortifications from "../templates/grad-fortifications";
//import useGradIslandconfig from "../templates/grad-islandconfig";
//import useGradLeaveNotes from "../templates/grad-leaveNotes";
//import useGradmakeFire from "../templates/grad-makeFire";
//import useGradScoreboard from "../templates/grad-scoreboard";


const router = Router();

router.post('/prepper/api', async (req, res) => {
    // TODO: Add express-validator to make sure body has correct format

    const {
        missionName = "CO_Template",
        worldName = "VR",
        userDescriptionChanges = ["1", "0", "0", "0", "0", "1", "30", "300", "500", "1", "20", "500", "1200", "150"],
        doLoadout = false,
        gradLoadoutChanges = ["10", "1", "0", "1"],
        doCivs = false,
        gradCivsChanges = ["1", "20", "30", "10", "{1000, 4500}", "{1000, 4500}", "0", "0", "3", "35", "1", "''", "''", "0.5"],
        doFactions = false
    } = req.body;

    let data = "";
    let descriptionChanges:string[][] = [];
    let missionPath = "./missionFile/" + missionName + "." + worldName; 

    createAndCopyDir('./missionFile/template/CO_Template.VR', missionPath);

    descriptionChanges.push(
        ["COOP TEMPLATE", missionName],
        ["timeMultiplier = 1;", "timeMultiplier = " + userDescriptionChanges[0] + ";"], 
        ["ambientLife = 0;", "ambientLife = " + userDescriptionChanges[1] + ";"],
        ["sideChannel = 0;", "sideChannel = " + userDescriptionChanges[2] + ";"],
        ["artilleryComputer = 0;", "artilleryComputer = " + userDescriptionChanges[3] + ";"],  
        ["showLogo = 0;", "showLogo = " + userDescriptionChanges[4] + ";"],

        //Corps & wreck managment
        ["corpseManagerMode = 1;", "corpseManagerMode = " + userDescriptionChanges[5] + ";"],
        ["corpseLimit = 30;", "corpseLimit = " + userDescriptionChanges[6] + ";"],
        ["corpseRemovalMinTime = 300;", , "corpseRemovalMinTime = " + userDescriptionChanges[7] + ";"],                                                    
        ["corpseRemovalMaxTime = 500;", "corpseRemovalMaxTime = " + userDescriptionChanges[8] + ";"],
        ["wreckManagerMode = 1;", "wreckManagerMode = " + userDescriptionChanges[9] + ";"],
        ["wreckLimit = 20;", "wreckLimit = " + userDescriptionChanges[10] + ";"],                                    
        ["wreckRemovalMinTime = 500;", "wreckRemovalMinTime = " + userDescriptionChanges[11] + ";"],               
        ["wreckRemovalMaxTime = 1200;", , "wreckRemovalMaxTime = " + userDescriptionChanges[12] + ";"],              
        ["minPlayerDistance = 150;", "minPlayerDistance = " + userDescriptionChanges[13] + ";"]  
    );

    if (doLoadout) {
        descriptionChanges = useGradLoadout(missionPath, descriptionChanges, gradLoadoutChanges);
    };

    if (doCivs) {
        descriptionChanges = useGradFactions(missionPath, descriptionChanges);
    };

    if (doLoadout && doFactions) {
        descriptionChanges = useGradCivs(missionPath, descriptionChanges, gradCivsChanges);
    };

    //Get config from description.ext
    data = readDataFromFile(missionPath + "/description.ext");

    //Change config to match user wishes
    data = changeData(descriptionChanges, data);

    //Write new config to description.ext
    writeDataToFile(missionPath + "/description.ext", data);

    await zipFolder(missionPath);
    removeFolder(missionPath);
    //Prompt downlaod at client
    res.download(missionPath + ".zip");
});

export default router;
