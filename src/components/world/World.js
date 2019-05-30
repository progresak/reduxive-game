import React from 'react';
import Map from '../map/Map';
import Player from '../player/Player';
// import {tiles} from '../../data/maps/2';
// import {generateDynamicMap} from '../../data/maps/3';
import { generateDynamicMap } from '../map/mapGenerator';
import store from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';
import ScoreBoard from '../ScoreBoard';
import Summary from '../Summary';

const World = () => {
  const tiles = generateDynamicMap(
    Math.floor(window.innerWidth / SPRITE_SIZE) - 1,
    Math.floor((window.innerHeight - 50) / SPRITE_SIZE) - 1,
  );
  const mapSize = [SPRITE_SIZE * tiles[0].length, SPRITE_SIZE * tiles.length];
  store.dispatch({ type: 'ADD_TILES', payload: { tiles, mapSize } });
  return (
    <div style={{
      position: 'relative',
      width: `${mapSize[0]}px`,
      height: `${mapSize[1]}px`,
    }}
    >
      <Map />
      <Player name="Progresoy" />
      <ScoreBoard />
      <Summary />
    </div>
  );
};

export default World;
