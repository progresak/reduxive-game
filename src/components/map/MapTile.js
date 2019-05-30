import React from 'react';
import uid from 'uid';
import { BOMB_TIMEOUT, DEFAULT_BOMB_POWER, SPRITE_SIZE } from '../../config/constants';

export const customTile = (type = 0, timer = 0, power = 0, imposible = false) => ({
  type: getTileSprite(type),
  timer,
  power,
  imposible,
  id: uid(10),
});

export const getBombTile = (timer = BOMB_TIMEOUT, power = DEFAULT_BOMB_POWER) => customTile(10, timer, power, true);

export const getTileSprite = (type) => {
  switch (type) {
    case 0:
      return 'grass';
    case 11:
      return 'explosion';
    case 10:
      return 'bomb';
    case 3:
      return 'tree';
    case 4:
      return 'chest';
    case 2:
      return 'crown';
    case 5:
      return 'rock';
    case 6:
      return 'tree';
    case 7:
      return 'upgrade';
    default:
      return 'grass';
  }
};

export const getRandomMapTile = (abadonedTile) => {
  const tilesIndexes = [0, 3, 4, 2, 5, 6, 0, 0, 7, 0, 0, 0, 0, 0, 0];
  const winnerNumber = tilesIndexes[Math.floor(Math.random() * tilesIndexes.length)];
  if (abadonedTile !== undefined && abadonedTile.includes(winnerNumber)) {
    return getRandomMapTile(abadonedTile);
  }
  if (getTileSprite(winnerNumber) === 'bomb') {
    return getBombTile();
  }
  return customTile(winnerNumber);
};

const MapTile = ({ tile }) => (
  <div
    className={`tile ${tile.type}`}
    style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}
    key={Math.random()}
  />
);

export default MapTile;
