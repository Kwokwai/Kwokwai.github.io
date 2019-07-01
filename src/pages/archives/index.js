import React, { Component } from 'react'
import Header from 'components/Header'
import './style.css'

export class Archives extends Component {
    render() {
        return (
            <div className='archives'>
                <Header/>
                <div className="content">归档</div>
            </div>
        )
    }
}

export default Archives
