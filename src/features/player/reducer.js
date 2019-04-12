import {BOMB_TIMEOUT, DEFAULT_BOMB_POWER, DEFAULT_MAXIMUM_BOMBS} from "../../config/constants";

const initialState = {
    position: [0, 0],
    spriteLocation: '0px Opx',
    defaultDirection: 'EAST',
    walkIndex: 0,
    bombPower: DEFAULT_BOMB_POWER,
    bombTimeout: BOMB_TIMEOUT,
    maximumBombs: DEFAULT_MAXIMUM_BOMBS
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return {
              ...state, ...action.payload
            };
        case 'INCREASE_BOMB_POWER':
            return {
               ...state, ...action.payload
            };
        default:
            return state;
    }
};

export default playerReducer;