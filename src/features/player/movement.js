import store from '../../config/store';
import {SPRITE_SIZE} from "../../config/constants";
import {customTile} from "../map/MapTile";

const handleMovement = (player) => {

    const getNewPosition = (oldPos, direction) => {
        switch (direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE];
            case 'SOUTH':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE];
            default:
                return oldPos;
        }
    };
    /*
        const observeBoundaries = (oldPos, newPos, mapSize) => {
            return (newPos[0] >= 0 && newPos[0] <= mapSize[0] - SPRITE_SIZE) &&
                (newPos[1] >= 0 && newPos[1] <= mapSize[1] - SPRITE_SIZE)
        };
    */

    const observeImpossable = (oldPos, newPos) => {
        const tiles = store.getState().map.tiles;
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x];
        return nextTile.type < 5;
    };

    const getWalkIndex = () => {
        const walkIndex = store.getState().player.walkIndex;
        return walkIndex >= 7 ? 0 : walkIndex + 1
    };

    const dispatchMove = (direction, newPos) => {

        const walkIndex = getWalkIndex();
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    };

    const getSpriteLocation = (direction, walkIndex) => {
        switch (direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE * walkIndex}px 0px`;
            case 'EAST':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE}px`;
            case 'WEST':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
            case 'NORTH':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
            default:
                return '0px 0px';
        }
    };

    const walkThroughBorders = (newPos, mapSize) => {
        return [
            ((newPos[0] >= mapSize[0]) ? 0 : (newPos[0] < 0) ? mapSize[0] - SPRITE_SIZE : newPos[0]),
            ((newPos[1] >= mapSize[1]) ? 0 : (newPos[1] < 0) ? mapSize[1] - SPRITE_SIZE : newPos[1]),
        ]
    };

    const attemptMove = (direction) => {
        const oldPos = store.getState().player.position;
        const bombPower = store.getState().player.bombPower;
        const mapSize = store.getState().map.mapSize;
        const newPos = walkThroughBorders(getNewPosition(oldPos, direction), mapSize);
        if (observeImpossable(oldPos, newPos)) {
            dispatchMove(direction, newPos);
            if (containBoost(newPos)) {
                store.dispatch({
                    type: 'INCREASE_BOMB_POWER',
                    payload: {
                        bombPower: bombPower + 1
                    }
                })
            }
        }
    };

    const containBoost = (newPos) => {
        const tiles = store.getState().map.tiles;

        const x = newPos[0] / SPRITE_SIZE;
        const y = newPos[1] / SPRITE_SIZE;
        if (tiles[y][x].type === 4) {
            store.dispatch({
                type: 'PLACE_OBJECT',
                payload: {
                    position: newPos,
                    object: customTile()
                }
            })
            return true;
        }
        return false;

    };

    const handleKeydown = (e) => {
        switch (e.keyCode) {

            case 65:
            case 37:
                e.preventDefault();
                return attemptMove('WEST');
            case 87:
            case 38:
                e.preventDefault();
                return attemptMove('NORTH');
            case 68:
            case 39:
                e.preventDefault();
                return attemptMove('EAST');
            case 83:
            case 40:
                e.preventDefault();
                return attemptMove('SOUTH');
            default:

        }
    };

    window.addEventListener('keydown', (e) => {
        handleKeydown(e);

    });

    return player;
};

export default handleMovement;