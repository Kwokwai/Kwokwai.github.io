import React, {Component, Fragment} from 'react'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Timeline} from 'antd';
import PropTypes from "prop-types";

import Header from '../../components/Header'
import ToTop from '../../components/ToTop'
import Paging from '../../components/Pagination'
import Loading from '../../components/Loading'
import * as Actions from '../../actions'
import './style.css'

const mapStateToProps = ({articleList}) => ({articleList})

const mapDispatchToProps = dispatch => ({
    archivesActions: bindActionCreators(Actions, dispatch),
})

export class Archives extends Component {
    constructor(props) {
        super(props)
        this.perPage = 10
        this.state = {
            loading: false,
            postList: []
        }
    }

    static propTypes = {
        articleList: PropTypes.object.isRequired,
        archivesActions: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.props.archivesActions.fetchPostInfo()
        this.props.archivesActions.resetPostList()
        this.getPostList(1)
    }

    getPostList = (pageNum) =>{
        this.props.archivesActions.fetchPostList(this.perPage, pageNum)
        this.pageNum = pageNum
        this.setState({
            loading: false
        })
    }

    render() {
        const {
            postInfo: {postCount},
            postList,
        } = this.props.articleList.toJS()
        const list = postList.reverse();
        const loading = this.state.loading;
        return (
            <div className='archives'>
                <Header/>
                <div className="layout">
                    <div className="layoutLeft"/>
                    <div className="layoutMiddle">
                        {loading ? <Loading/> :
                            <div className="timeLine">
                                {list.map((d, i) => (
                                    <Fragment key={i}>
                                        {i === 0 && (
                                            <Timeline.Item>
                                                <span className="desc">{`总共有${postCount}篇文章.`}</span>
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
                            <Paging current={parseInt(this.pageNum, 10) || 1} onChange={this.getPostList} total={postCount} pageSize={10} className="pagination"/>
                            </div>
                        }

                    </div>
                    <div className="layoutRight">
                        <ToTop/>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Archives)
