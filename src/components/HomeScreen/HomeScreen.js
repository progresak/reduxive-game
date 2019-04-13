import React from 'react';
import './HomeScreen.css';
import bombSvg from './bomb.svg';

const HomeScreen = (props) => {

    return (
        <div className="loginContainer">
            <img alt="logo" className={'bombLogo'} src={bombSvg}/>
            <h1>Progresak Bomberman</h1>
            <button onClick={(e) => {
                e.preventDefault();
                props.onPlayButtonClick()
            }} className={'btn third'}>Play Game!
            </button>
            <h2>W,A,S,D,SpaceBar</h2>
        </div>
    );

};

export default HomeScreen;