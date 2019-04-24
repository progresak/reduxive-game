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
        case 'REPLACE_TILES':
            return {...state, tiles: action.payload.tiles};
        case 'PLACE_OBJECT':
            const newTiles = Array.from(state.tiles);
            newTiles[action.payload.position[1] / SPRITE_SIZE][action.payload.position[0] / SPRITE_SIZE] = action.payload.object;
            return {...state, tiles: newTiles};
        default:
            return state;
    }
};

export default mapReducer;