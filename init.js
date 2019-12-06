const http = require('http');
const fs = require('fs-extra');
const fse = require('fs');
/*
http.createServer(function (req, res) {
  fs.readFile('description.ext', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
*/
function createAndCopy (directory) {
  try {
    fs.ensureDirSync(directory);

    try {
      fs.copySync('missionFile/template/CO_Template.VR', 'missionFile/CO_Template.VR');
    } catch (err) {
      console.error(err);
    };
  } catch (err) {
    console.error(err)
  };
}
createAndCopy('missionFile/CO_Template.VR')


function changeDescription (values) {

  let data = "";

  try {
    data = fs.readFileSync("missionFile/CO_Template.VR/description.ext", 'utf-8');
  } catch (err) {
    console.error(err);
  };
  
  values.forEach(function(element){
    let oldElement = element[0];
    let newElement = element[1];
    let index = data.indexOf(oldElement);

    if (index !== -1) {
      data = data.replace(oldElement, newElement);
    } else {
      data = data + "\n" + newElement;
    };
  });

  try {
    fs.writeFileSync("missionFile/CO_Template.VR/description.ext", data, 'utf-8');
  } catch (err) {
    console.error(err);
  };
};

changeDescription([["missionName = '';", "missionName = 'testR';"], ["name = '';", "name = 'Salbei';"], ["respawn = 3;", "respawn = 4;"]]);


function removeFolder (src) {
  try {
    fs.removeSync(src)
  } catch (err) {
    console.error(err)
  }
}

//removeFolder('missionFile/CO_Template.VR')

