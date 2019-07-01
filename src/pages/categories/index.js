import React, { Component } from 'react'
import Header from 'components/Header'
import './style.css'

export class Archives extends Component {
    render() {
        return (
            <div className='categories'>
                <Header/>
                <div className="content">分类</div>
            </div>
        )
    }
}

export default Archives
