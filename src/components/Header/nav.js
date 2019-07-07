import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

class Nav extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired,
        mode: PropTypes.string
    }

    static defaultProps = {
        mode: 'horizontal'
    }

    render() {
        const { navList, mode } = this.props
        return (
            <Menu mode={mode} selectedKeys={[this.props.location.pathname]} className="headerNav">
                {navList.map(nav => (
                    <Menu.Item key={nav.link}>
                        <Link to={nav.link}>
                            {nav.icon && <Icon type={nav.icon}/>}
                            <span>{nav.title}</span>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        )
    }
}

export default withRouter(Nav)
