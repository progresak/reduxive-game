import {customTile, getRandomMapTile} from "./MapTile";

const getCleanMap = (width, height) => {
    const cleanMap = new Array(height.length);
    for (let y = 0; y < height; y++) {
        cleanMap[y] = new Array(width.length);
        for (let x = 0; x < width; x++) {
            cleanMap[y][x] = customTile();
        }
    }
    return cleanMap;
};

// use GENERATOR!

export const generateDynamicMap = (width, height) => {

    let cleanMap = getCleanMap(width, height);


    const maxElements = {
        4: 10,
        2: 12,
        5: 12,
        7: 12,
        3: 20,
        6: 42
    };

    for (let property in maxElements) {
        if (maxElements.hasOwnProperty(property)) {
            // console.log({maxElements, property})
            // console.log(maxElements[property])
            for (let i = 1; i <= maxElements[property]; i++) {
                cleanMap[getRandomInt(1, height)-1][getRandomInt(1, width)-1] = customTile(parseInt(property));
            }
        }
    }

    return cleanMap;
    // todo: vygenerovat všechno prázdné
    // mít pole toho, co se musí do mapy vložit
    // iterovat přes to a vkládat to na random X,Y pozici
    // ptát se "je tato pozice prázdná"? Ano - vložit, ne "Najít jinou pozici"
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}