import React, { Component } from 'react'
import './style.css';

export class ToTop extends Component {
    constructor() {
        super();
        this.state = {
            scale: 0,
            scrollScale: 0
        };
    }

    scrollHandler = this.handleScroll.bind(this);
    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    handleScroll() {
        let clientHeight = document.documentElement.clientHeight;   //可视区域高度
        let scrollTop  = document.documentElement.scrollTop;        //滚动条滚动高度
        let scrollHeight =document.documentElement.scrollHeight;    //滚动内容高度
        let scrollArea = scrollHeight - clientHeight
        let ratio = scrollTop / scrollArea
        let scrollScale = ratio.toFixed(2)
        let scale = Number((1-scrollScale)*100).toFixed(0) + '%'
        this.setState({
            scale: Number(scrollScale*100).toFixed(0) + '%',
            scrollScale: scrollScale
        })
        document.documentElement.style.setProperty('--scale', scale)
    }

    handleScrollTop() {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    }
    render() {
        return(
            <div className="toTop" onClick={this.handleScrollTop} style={{display: this.state.scrollScale > 0 ? 'block' : 'none'}}>{this.state.scale}</div>
        )
    }
}

export default ToTop
