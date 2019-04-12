import store from '../../config/store';
import {customTile, getBombTile} from "../map/MapTile";
import {EXPLOSION_VISIBLE, SPRITE_SIZE} from "../../config/constants";

const handleControl = (player) => {

    const placeBomb = () => {
        const {position, bombPower, bombTimeout} = store.getState().player;
        const tiles = store.getState().map.tiles;
        const bomb = getBombTile(bombTimeout, bombPower);
        dispatchPlaceBomb(position, bomb);
        setTimeout(() => {
            const x = position[1] / SPRITE_SIZE;
            const y = position[0] / SPRITE_SIZE;
            dispatchBombExplode(boom(tiles, bomb.power, [y, x], customTile(11)));
            setTimeout(() => {
                dispatchBombExplode(boom(Array.from(tiles), bomb.power, [y, x], customTile(0)))
            }, EXPLOSION_VISIBLE);
        }, bomb.timer);

    };

    const dispatchBombExplode = (tiles) => {
        store.dispatch({
            type: 'REPLACE_TILES',
            payload: {
                tiles
            }
        })
    };


    const boom = (tiles, power, position, tile) => {
        for (let y = 1; y <= power; y++) {
            if ((tiles[position[1] + y]) !== undefined) {
                tiles[position[1] + y][position[0]] = tile
            }
            if ((tiles[position[1] - y]) !== undefined) {
                tiles[position[1] - y][position[0]] = tile
            }
            if ((tiles[position[1]][position[0] + y]) !== undefined) {
                tiles[position[1]][position[0] + y] = tile
            }
            if ((tiles[position[1]][position[0] - y]) !== undefined) {
                tiles[position[1]][position[0] - y] = tile
            }
        }
        tiles[position[1]][position[0]] = tile;
        return tiles;
    };

    const dispatchPlaceBomb = (position, bomb) => {
        store.dispatch({
            type: 'PLACE_OBJECT',
            payload: {
                position,
                object: bomb
            }
        })
    };

    const handleKeydown = (e) => {
        switch (e.keyCode) {

            case 32: // space
                e.preventDefault();
                return placeBomb();
            default:
                return;
        }
    };

    window.addEventListener('keydown', (e) => {
        handleKeydown(e);
    });

    return player;
};

export default handleControl;