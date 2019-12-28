export default function useGradFactions (missionName, descriptionChanges) {
    createAndCopyDir('missionFile/template/node_modules/grad-factions', missionName + '/node_modules/grad-factions');
  
    descriptionChanges.push(
        ["", "        #include <node_modules\grad-factions\loadouts.hpp>", "class Faction {"]
    );
  
    return descriptionChanges
};
  