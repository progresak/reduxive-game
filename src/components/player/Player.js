import React from 'react';
import { connect } from 'react-redux';
import playerWalk from './player_walk.png';
import handleMovement from './movement';
import handleControl from './control';

const Player = (props) => {
  if (props.gameOver) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: props.position[1],
      left: props.position[0],
      backgroundImage: `url('${playerWalk}')`,
      backgroundPosition: props.spriteLocation,
      width: '40px',
      height: '40px',
    }}
    />
  );
};

const mapStateToProps = state => ({
  ...state.player,
});

export default connect(mapStateToProps)(handleControl(handleMovement(Player)));
