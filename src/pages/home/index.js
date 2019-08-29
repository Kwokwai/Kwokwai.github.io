import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import PostList from '../../components/PostList'
import Header from '../../components/Header'
import ToTop from '../../components/ToTop'
import Paging from '../../components/Pagination'
import Loading from '../../components/Loading'
import * as Actions from '../../actions'
import './style.css'

const mapStateToProps = ({articleList}) => ({articleList})

const mapDispatchToProps = dispatch => ({
    homeActions: bindActionCreators(Actions, dispatch),
})

export class Home extends Component {
    constructor(props) {
        super(props);
        this.perPage = 10;
        this.state = {
            list: [],
            page: 1,
            total: 0,
            name: '',
            loading: false
        }
    }

    static propTypes = {
        articleList: PropTypes.object.isRequired,
        homeActions: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.setState({
            loadng: true
        })
        this.props.homeActions.fetchPostInfo()
        this.props.homeActions.resetPostList()
        this.getPostList(1)

    }


    getPostList = (pageNum) =>{
        this.props.homeActions.fetchPostList(this.perPage, pageNum)
        this.pageNum = pageNum
        this.setState({
            loading: false
        })
    }

    render() {
        const {
            postInfo: {postCount, tagInfo},
            postList,
        } = this.props.articleList.toJS()

        const navList = [
            {
                linkTo: '/',
                tag: `全部文章（${postCount}）`,
            },
            ...tagInfo,
        ]

        const loading = this.state.loading
        return (
            <Fragment>
                <div className="home">
                    <Header data={navList}/>
                    <div className="layout">
                        <div className="layoutLeft"/>
                        <div className="layoutMiddle">
                            {loading ? <Loading/> :
                                <div className="postList">
                                    <PostList data={postList.reverse()}/>
                                    <Paging current={parseInt(this.pageNum, 10) || 1} onChange={this.getPostList} total={postCount} pageSize={10} className="pagination"/>
                                </div>
                            }
                        </div>
                        <div className="layoutRight">
                            <ToTop/>
                        </div>
                    </div>
                </div>
                <div className="footer"/>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
