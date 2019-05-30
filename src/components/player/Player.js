import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import playerWalk from './player_walk.png';
import handleMovement from './movement';
import handleControl from './control';
import { createPlayer as CP } from '../../actions';
import { BOMB_TIMEOUT, DEFAULT_BOMB_POWER, DEFAULT_MAXIMUM_BOMBS } from '../../config/constants';

export const defaultPlayer = name => ({
  name,
  position: [0, 0],
  spriteLocation: '0px Opx',
  defaultDirection: 'EAST',
  walkIndex: 0,
  bombPower: DEFAULT_BOMB_POWER,
  bombTimeout: BOMB_TIMEOUT,
  maximumBombs: DEFAULT_MAXIMUM_BOMBS,
  gameOver: false,
  controls: {
    up: 1,
    down: 13,
    left: 12,
    right: 11,
    bomb: 23,
  },
});

const Player = (props) => {
  const {
    playingPlayers, createPlayer, name, gameOver,
  } = props;
  useEffect(() => {
    createPlayer(defaultPlayer(name));
  }, []);

  if (gameOver || !playingPlayers.length) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: playingPlayers[0].position[1],
      left: playingPlayers[0].position[0],
      backgroundImage: `url('${playerWalk}')`,
      backgroundPosition: playingPlayers[0].spriteLocation,
      width: '40px',
      height: '40px',
    }}
    />
  );
};

Player.propTypes = {
  playingPlayers: PropTypes.any.isRequired,
  createPlayer: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gameOver: PropTypes.bool,
};

Player.defaultProps = {
  gameOver: false,
};

const mapStateToProps = state => ({
  // ...state.player,
  playingPlayers: state.map.players,
});


export default connect(
  mapStateToProps, { createPlayer: CP },
)(handleControl(handleMovement(Player)));
