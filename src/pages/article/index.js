import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Icon, Tag, Badge} from 'antd'
import Markdown from '../../components/Markdown'
import Header from '../../components/Header'
import ToTop from '../../components/ToTop'
import * as Actions from '../../actions'
import 'markdown-navbar/dist/navbar.css'
import './style.css'
import {randomId} from 'utils';
import {Link} from "react-router-dom";

const mapStateToProps = ({article}) => ({article})

const mapDispatchToProps = dispatch => ({
    articleActions: bindActionCreators(Actions, dispatch),
})

export class Article extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        articleActions: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.articleActions.fetchPostInfo()

        const {postName} = this.props.match.params
        this.props.articleActions.fetchPostContent(postName)
        this.node.scrollIntoView();
    }

    componentDidUpdate(prevProps) {
        const oldPostName = prevProps.match.params.postName
        const {postName} = this.props.match.params

        if (oldPostName !== postName) {
            this.props.articleActions.resetPostContent()
            this.props.articleActions.fetchPostContent(postName)
        }
    }

    render() {
        const {
            postInfo: {postCount, tagInfo},
            postContent: {title, createDate, tag, content},
        } = this.props.article.toJS()
        const navList = [
            {
                linkTo: '/',
                tag: `全部文章（${postCount}）`,
            },
            ...tagInfo,
        ]

        const colorList = ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple']

        return (
            <div className="article markdown-body" ref={node => this.node = node}>
                <Header data={navList}/>
                <div className='layout'>
                    <div className='layoutLeft'>
                    </div>
                    <div className='layoutMiddle'>
                        <article className="articleContent">
                            <div className="inner">
                                <h1>
                                    {title}
                                </h1>
                                <div className="date">
                                    <Icon type="calendar"/>&nbsp;&nbsp;
                                    {createDate}
                                </div>

                                <div className="tags">
                                    <Icon type="tags"/>&nbsp;&nbsp;
                                    {tag ?
                                        tag.map((t, i) =>
                                            <Badge key={`post_tag_${randomId()}`}>
                                                <Tag color={colorList[i]}>
                                                    <Link to={`/tag/${t}`}>
                                                            {t}
                                                    </Link>
                                                </Tag>
                                            </Badge>
                                        )
                                        : ''}
                                </div>
                                <div className="content">
                                    {content ? <Markdown source={content}/> : <h2>内容加载中...</h2>}
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className='layoutRight'>
                        <ToTop/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
