import {SPRITE_SIZE} from "../../config/constants";

const initialState = {
    tiles: [],
    mapSize: []
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TILES':
            return {
                ...action.payload
            };
        case 'PLACE_BOMB':

            const xIndex = action.payload.position[0] / SPRITE_SIZE;
            const yIndex = action.payload.position[1] / SPRITE_SIZE;
            console.log({xIndex, yIndex})
            // state[yIndex][xIndex] = 1;
            // return state.tiles.map(el => el)
            // const [y, x] = [yIndex, xIndex];
            const newTiles = Array.from(state.tiles);
            newTiles[yIndex][xIndex] = 1;


            return {...state, tiles: newTiles};
// console.log(xx);;
        default:
            return state;
    }
};

export default mapReducer;