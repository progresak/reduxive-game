import React from 'react';
import './style.css';
import explosion from '../map/tiles/explosion.png';
import {connect} from "react-redux";

const ScoreBoard = ({bombPower, dimension}) => {
    return (
        <div className={'scoreBoard'}>
            <span><img style={{height: '40px', margin: '5px'}} src={explosion} alt={'Explosion'}/>{bombPower}</span>

            <span>[{`${dimension[0]}x${dimension[1]}`}]</span>
        </div>
    )
};

const mapStateToProps = (state) => {
    const tiles = state.map.tiles;

    return {
        bombPower: state.player.bombPower,
        dimension: (tiles.length) ? [tiles[0].length, tiles.length] : []
    }
};

export default connect(mapStateToProps)(ScoreBoard);