import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import store from "../../config/store";
import {generateDynamicMap} from "../../data/maps/3";
import {SPRITE_SIZE} from "../../config/constants";
import {connect} from "react-redux";

const Summary = (props) => {


    if (!props.gameOver) {
        return null;
    }

    const onButtonClickRestart = () => {
        const tiles = generateDynamicMap(
            Math.floor(window.innerWidth / SPRITE_SIZE) - 1,
            Math.floor((window.innerHeight - 50) / SPRITE_SIZE) - 1);

        const mapSize = [SPRITE_SIZE * tiles[0].length, SPRITE_SIZE * tiles.length];
        store.dispatch({type: 'ADD_TILES', payload: {tiles, mapSize}});
        store.dispatch({type: 'NEW_GAME'});
    };

    return ReactDOM.createPortal(
        <div className="modalContainer">
            <div className={'summaryTable'}>
                <p>Game Over</p>
                <button onClick={(e) => {
                    e.preventDefault();
                    onButtonClickRestart()
                }} className={'btn first'}>Restart
                </button>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

const mapStateToProps = (state) => {
  return {
      gameOver: state.player.gameOver
  }
};

export default connect(mapStateToProps)(Summary);


