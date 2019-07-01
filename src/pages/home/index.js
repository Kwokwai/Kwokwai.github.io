import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PostList from 'components/PostList'
import Header from 'components/Header'
import * as HomeActions from './actions'
import { Button } from 'antd'
import './style.css'

const mapStateToProps = ({ home }) => ({ home })

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
})

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.perPage = 6
  }

  componentDidMount() {
    this.props.homeActions.fetchPostInfo()
    this.props.homeActions.resetPostList()
    this._loadPage(1)
  }

  _loadPage(pageNum) {
    this.props.homeActions.fetchPostList(this.perPage, pageNum)
    this.pageNum = pageNum
  }

  render() {
    const {
      postInfo: { postCount, tagInfo },
      postList,
      loadMore,
    } = this.props.home.toJS()

    const navList = [
      {
        linkTo: '/',
        tag: `全部文章（${postCount}）`,
      },
      ...tagInfo,
    ]

    const loadMoreBtn = loadMore
      ? <Button
          size="large"
          className="loadMore"
          onClick={() => this._loadPage(this.pageNum + 1)}>
          加载更多文章
        </Button>
      : false

    return (
      <div className="home">
        <Header data={navList} activeTag={`全部文章（${postCount}）`} />
        <div className="layout">
            <div className="layoutLeft"/>
            <div className="layoutMiddle">
                <div className="postList">
                    <PostList data={postList} />
                    {loadMoreBtn}
                </div>
            </div>
            <div className="layoutRight"/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
