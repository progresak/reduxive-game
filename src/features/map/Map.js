import React from 'react';
import {SPRITE_SIZE} from "../../config/constants";
import {connect} from "react-redux";
import './styles.css';

const getTileSprite = (type) => {
    switch (type) {
        case 0:
            return 'grass';
        case 3:
            return 'tree';
        case 4:
            return 'chest';
        case 5:
            return 'rock';
        case 6:
            return 'tree';
        default:
        // return "grass";
    }
};

const MapTile = (props) => {
    return <div
        className={`tile ${getTileSprite(props.tile)}`}
        style={{height: SPRITE_SIZE, width: SPRITE_SIZE}}
        key={Math.random()}
    />
};

const MapRow = (props) => {
    return (
        <div className={'row'}>{props.tiles.map(tile =>
                <MapTile
                    tile={tile}
                    key={Math.random()}
                />)}</div>
    );
}

const Map = (props) => {
    return (
        <div style={{
            width: `${props.mapSize[0]}px`,
            height: `${props.mapSize[1]}px`,
            margin: 'auto',
            border: '4px solid white'
        }}>{props.tiles.map(row => <MapRow
                    tiles={row}
                    key={Math.random()}
                />)}</div>
    )
};

const mapStateToProps = (state) => {
    return {
        tiles: state.map.tiles,
        mapSize: state.map.mapSize
    }
};

export default connect(mapStateToProps)(Map);