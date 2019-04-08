import React from 'react';
import Map from "../map/Map";
import Player from "../player/Player";
import {tiles} from '../../data/maps/1';
import store from '../../config/store';

const World = (props) => {
    store.dispatch({type: 'ADD_TILES', payload: {tiles}})
    return (
        <div style={{
            position: 'relative',
            width: '800px',
            height: '400px',
            margin: '20px auto'
        }}>
            <Map/>
            <Player/>
        </div>
    );
};

export default World;