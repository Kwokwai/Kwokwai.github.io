import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PostList from 'components/PostList'
import Header from 'components/Header'
import ToTop from 'components/ToTop'
import Paging from 'components/Pagination'
import * as TagPostActions from './actions'
import './style.css'

const mapStateToProps = ({tagPost}) => ({tagPost})

const mapDispatchToProps = dispatch => ({
    tagPostActions: bindActionCreators(TagPostActions, dispatch),
})

export class TagPost extends Component {
    static propTypes = {
        tagPost: PropTypes.object.isRequired,
        tagPostActions: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.perPage = 10
    }

    componentDidMount() {
        this.props.tagPostActions.fetchPostInfo()

        const {tagName} = this.props.match.params
        this.props.tagPostActions.setTagName(tagName)
        this._loadPage(1)
    }

    componentDidUpdate(prevProps) {
        let oldTag = prevProps.match.params.tagName
        let newTag = this.props.match.params.tagName

        if (newTag !== oldTag) {
            this.props.tagPostActions.setTagName(newTag)
            this._loadPage(1)
        }
    }

    _loadPage(pageNum) {
        const {tagName} = this.props.match.params
        this.props.tagPostActions.fetchTagPostList(tagName, this.perPage, pageNum)

        this.pageNum = pageNum
    }

    getPostList = (pageNum) => {
        const {tagName} = this.props.match.params
        this.props.tagPostActions.fetchTagPostList(tagName, this.perPage, pageNum)
        this.pageNum = pageNum
    }

    render() {
        // const { tagName } = this.props.match.params

        const {
            postInfo: {tagInfo},
            postList,
            total,
        } = this.props.tagPost.toJS()

        const navList = [
            {
                linkTo: '/',
                tag: `全部文章（${total}）`,
            },
            ...tagInfo,
        ]

        return (
            <div className="tags">
                <Header data={navList}/>
                <div className="layout">
                    <div className="layoutLeft"/>
                    <div className="layoutMiddle">
                        <div className="postList">
                            <PostList data={postList}/>
                            <Paging current={parseInt(this.pageNum, 10) || 1} onChange={this.getPostList} total={total}
                                    pageSize={10} className="pagination"/>
                        </div>
                    </div>
                    <div className="layoutRight">
                        <ToTop/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPost)
