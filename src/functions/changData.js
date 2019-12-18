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