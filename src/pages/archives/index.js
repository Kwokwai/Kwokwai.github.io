import React, {Component, Fragment,useState} from 'react'
import Header from 'components/Header'
import ToTop from 'components/ToTop'
import {Link} from 'react-router-dom'
import {Timeline, Icon} from 'antd';
import Paging from 'components/Pagination'
import './style.css'
import axios from "axios";

export class Archives extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postList: []
        }
    }
    componentDidMount() {
        this.getPostList()
    }
    getPostList = async () => {
        const postList = await axios.get(`/data.json?t=${Date.now()}`)
        this.setState({
            postList: postList.data,
        })
        return postList.data
    }

    render() {
        const list = this.state.postList.reverse()
        return (
            <div className='archives'>
                <Header/>
                <div className="layout">
                    <div className="layoutLeft"/>
                    <div className="layoutMiddle">
                        <div className="timeLine">
                            {list.map((d, i) => (
                                <Fragment key={i}>
                                    {i === 0 && (
                                        <Timeline.Item>
                                            <span className="desc">{`总共有${list.length}篇文章.`}</span>
                                            <br />
                                            <br />
                                        </Timeline.Item>
                                    )}

                                    <Timeline.Item key={i}>
                                        <span style={{ fontSize: '13px', marginRight: '16px' }}>{d.createDate.slice(0, 10)}</span>
                                        <Link to={d.url}>{d.title}</Link>
                                    </Timeline.Item>
                                </Fragment>
                            ))}
                        </div>
                        <Paging current={parseInt(this.pageNum, 10) || 1} onChange={this.getPostList} total={10} pageSize={10} className="pagination"/>
                    </div>
                    <div className="layoutRight">
                        <ToTop/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Archives
