import store from '../../config/store';
import {SPRITE_SIZE} from "../../config/constants";

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

    const observeBoundaries = (oldPos, newPos, mapSize) => {
        return (newPos[0] >= 0 && newPos[0] <= mapSize[0] - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= mapSize[1] - SPRITE_SIZE)
    };


    const observeImpossable = (oldPos, newPos) => {
        const tiles = store.getState().map.tiles;
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        const nextTile = tiles[y][x];
        return nextTile < 5;
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
        const mapSize = store.getState().map.mapSize;
        const newPos = walkThroughBorders(getNewPosition(oldPos, direction), mapSize);
        if (observeImpossable(oldPos, newPos)) {
            dispatchMove(direction, newPos);
        }
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

    let fired = {};

    // const isInversionMove = (fired) => {
    //     return ((fired[65] || fired[37]) && (fired[68] || fired[39]));
    // };

    window.addEventListener('keydown', (e) => {

        if (!fired[e.keyCode]) {
            fired[e.keyCode] = true;
            let actualMove = setInterval(() => {
                handleKeydown(e);
            }, 1000 / 25);
            window.addEventListener('keyup', (e) => {
                e.preventDefault();
                fired[e.keyCode] = false;
                clearInterval(actualMove);
            });
        }

    });

    return player;
};

export default handleMovement;