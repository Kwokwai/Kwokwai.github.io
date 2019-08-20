import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'

export class Paging extends Component {
    static propTypes = {
        total: PropTypes.number,
        onChange: PropTypes.func,
        current: PropTypes.number,
        pageSize: PropTypes.number
    }

    static defaultProps = {
        pageSize: 10
    }

    render() {
        const { total, current, onChange, pageSize } = this.props
        return (
            <div className="pagination">
                <Pagination current={current} onChange={onChange} total={total} pageSize={pageSize}/>
            </div>
        )
    }
}

export default Paging
