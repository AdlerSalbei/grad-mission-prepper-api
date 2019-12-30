export default function changeData(changes: string[][], data: string) {

    changes.forEach(function (element: string[]) {
        let oldElement = element[0];
        let newElement = element[1];
        let className = element[2];
        let putBefore = element[3];

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
                let indexBracket = data.indexOf("}", indexClass);

                let firstString = data.substr(0, indexBracket);
                let lastString = data.substr(indexBracket, data.length);

                data = firstString + "\n" + newElement + "\n" + lastString;
            }
                break;
            case 4: {
                let indexClass = data.indexOf(className);
                let indexBracket = data.indexOf(putBefore, indexClass);

                let firstString = data.substr(0, indexBracket);
                let lastString = data.substr(indexBracket, data.length);

                data = firstString + "\n" + newElement + "\n" + lastString;
            }
                break;
        };
    });
    return data
};