import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';
import MapTile from './MapTile';

const MapRow = (props) => {
  const { tiles } = props;
  return (
    <div className="row">
      {tiles.map(tile => (
        <MapTile
          tile={tile}
          key={Math.random()}
        />
      ))}

    </div>
  );
};

const Map = (props) => {
  const { mapSize, tiles } = props;
  return (
    <div
      className="mapContainer"
      style={{
        width: `${mapSize[0]}px`,
        height: `${mapSize[1]}px`,
        margin: 'auto',
        border: '4px solid white',
      }}
    >
      {tiles.map(row => (
        <MapRow
          tiles={row}
          key={Math.random()}
        />
      ))}

    </div>
  );
};

const mapStateToProps = state => ({
  tiles: state.map.tiles,
  mapSize: state.map.mapSize,
});


MapRow.propTypes = {
  tiles: PropTypes.any,
};

Map.propTypes = {
  mapSize: PropTypes.any.isRequired,
  tiles: PropTypes.any.isRequired,
};

export default connect(mapStateToProps)(Map);
