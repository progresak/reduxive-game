import React from 'react';
import {BOMB_TIMEOUT, DEFAULT_BOMB_POWER, SPRITE_SIZE} from "../../config/constants";
import uid from 'uid';

export const getRandomMapTile = () => {
    const tilesIndexes = [0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const winnerNumber = tilesIndexes[Math.floor(Math.random() * tilesIndexes.length)];
    if (getTileSprite(winnerNumber) === 'bomb') {
        return getBombTile();
    } else {
        return customTile(winnerNumber);
    }
};

export const getBombTile = (timer = BOMB_TIMEOUT, power = DEFAULT_BOMB_POWER) => {
    return customTile(10, timer, power);
};

export const customTile = (type = 0, timer = 0, power = 0) => {
    return {
        type,
        timer,
        power,
        id: uid(10)
    }
};

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
        case 5:
            return 'rock';
        case 6:
            return 'tree';
        default:
            return "grass";
    }
};

const MapTile = ({tile}) => {

    return (
        <div
            className={`tile ${getTileSprite(tile.type)}`}
            style={{height: SPRITE_SIZE, width: SPRITE_SIZE}}
            key={Math.random()}
        />
    );
};

export default MapTile;