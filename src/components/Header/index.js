import React, { Component } from 'react'
import './style.css'

import { Layout, Row, Col } from 'antd'
import Nav from './nav'
import NavLeft from './navLeft'

const Header = Layout.Header

const navList = [
    {
      icon: 'home',
      title: '首页',
      link: '/'
    },
    {
      icon: 'edit',
      title: '归档',
      link: '/archives'
    },
    {
      icon: 'folder',
      title: '分类',
      link: '/categories'
    },
    {
      icon: 'user',
      title: '关于',
      link: '/about'
    }
]

const Home = () => {
    const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
    const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }

    return (
        <Header className="headerContaienr" style={{background: '#fff'}}>
            <Row>
                <Col {...responsiveLeft}>
                    <NavLeft navList={navList}/>
                </Col>
                <Col {...responsiveRight}>
                    <Nav navList={navList}/>
                </Col>
            </Row>
        </Header>
    )
}

export default Home
