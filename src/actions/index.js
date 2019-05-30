export const placeObject = (newPos, object) => ({
  type: 'PLACE_OBJECT',
  payload: {
    position: newPos,
    object,
  },
});

export const createPlayer = playerObject => ({
  type: 'CREATE_PLAYER',
  payload: playerObject,
});
