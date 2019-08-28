import React, { Component } from 'react'
import './style.css';

export class Loading extends Component {
    render() {
        return (
            <div className="loader">
                <div className="inner one"/>
                <div className="inner two"/>
                <div className="inner three"/>
            </div>
        );
    }
}

export default Loading
