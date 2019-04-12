import React from 'react';
import {connect} from "react-redux";
import './styles.css';
import MapTile from "./MapTile";

const MapRow = (props) => {
    return (
        <div className={'row'}>{props.tiles.map(tile =>
            <MapTile
                tile={tile}
                key={Math.random()}
            />)}</div>
    );
};

const Map = (props) => {
    return (
        <div className={'mapContainer'} style={{
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