import React from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'


const NavLeft = ({ navList }) => {
    const navItem = (
        <Menu className="header-nav">
            {navList.map(nav => (
                <Menu.Item key={nav.link}>
                    <Link to={nav.link}>
                        {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
                        <span className="nav-text">{nav.title}</span>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    )

    return (
        <div className="headerLeft">
            <i className="iconfont icon-airplane" style={{ color: '#055796' }} />
            <Link to='/'><span className="blogName">Kwok</span></Link>
            <Dropdown overlayClassName="headerDropdown" trigger={['click']} overlay={navItem} >
                <Icon type="menu-o" className="nav-phone-icon" />
            </Dropdown>
        </div>
    )
}

export default NavLeft
