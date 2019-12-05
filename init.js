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



function changeDescription (values) {
  var data = fs.readFileSync("missionFile/co_template.vr/description.ext", 'utf-8');

  values.forEach(function(element){
    var oldElement = element[0];
    var newElement = element[1];
    var index = data.indexOf(oldElement);

    if (index !== -1) {
      data = data.replace(oldElement, newElement);
    } else {
      data = data + newElement;
    };
  });

  fs.writeFileSync("missionFile/co_template.vr/description.ext", data, 'utf-8');
};

changeDescription([["missionName = '';", "missionName = 'testR';"], ["name = '';", "name = 'Salbei';"]]);