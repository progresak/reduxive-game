import React from 'react';
import playerWalk from './player_walk.png';
import {connect} from "react-redux";
import handleMovement from './movement';
import handleControl from "./control";

const Player = (props) => {
    return (
        <div style={{
            position: 'absolute',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${playerWalk}')`,
            backgroundPosition: props.spriteLocation,
            width: '40px',
            height: '40px'
        }}>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        ...state.player
    }
};

export default connect(mapStateToProps)(handleControl(handleMovement(Player)));