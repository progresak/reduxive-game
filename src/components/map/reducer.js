import { SPRITE_SIZE } from '../../config/constants';

const initialState = {
  tiles: [],
  mapSize: [],
  players: [],
};

const mapReducer = (state = initialState, action) => {
  const newTiles = Array.from(state.tiles);
  switch (action.type) {
    case 'ADD_TILES':
      return {
        ...state, tiles: action.payload.tiles, mapSize: action.payload.mapSize,
      };
    case 'CREATE_PLAYER':
      return { ...state, players: [...state.players, action.payload] };
    case 'REPLACE_TILES':
      return { ...state, tiles: action.payload.tiles };
    case 'PLACE_OBJECT':
      newTiles[action.payload.position[1] / SPRITE_SIZE][action.payload.position[0] / SPRITE_SIZE] = action.payload.object;
      return { ...state, tiles: newTiles };
    default:
      return state;
  }
};

export default mapReducer;
