import store from '../../config/store';

const handleControl = (player) => {

    const placeBomb = () => {
        const position = store.getState().player.position;
        dispatchPlaceBomb(position)
    };

    const dispatchPlaceBomb = (position) => {
        store.dispatch({
            type: 'PLACE_BOMB',
            payload: {
                position
            }
        })
    };

    const handleKeydown = (e) => {
        switch (e.keyCode) {

            case 32: // space
                e.preventDefault();
                return placeBomb();
            default:
                console.log(e.keyCode);

        }
    };

    window.addEventListener('keydown', (e) => {
        handleKeydown(e);
    });

    return player;
};

export default handleControl;