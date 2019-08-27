import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Markdown from 'components/Markdown'
import Header from 'components/Header'
import ToTop from 'components/ToTop'
import * as ArticleActions from './actions'
import './style.css'
import 'markdown-navbar/dist/navbar.css'

const mapStateToProps = ({ article }) => ({ article })

const mapDispatchToProps = dispatch => ({
  articleActions: bindActionCreators(ArticleActions, dispatch),
})

export class Article extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    articleActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.articleActions.fetchPostInfo()

    const { postName } = this.props.match.params
    this.props.articleActions.fetchPostContent(postName)
  }

  componentDidUpdate(prevProps) {
    const oldPostName = prevProps.match.params.postName
    const { postName } = this.props.match.params

    if (oldPostName !== postName) {
      this.props.articleActions.resetPostContent()
      this.props.articleActions.fetchPostContent(postName)
    }
  }

  render() {
    const {
      postInfo: { postCount, tagInfo },
      postContent: { title, createDate, tag, content },
    } = this.props.article.toJS()

    const navList = [
      {
        linkTo: '/',
        tag: `全部文章（${postCount}）`,
      },
      ...tagInfo,
    ]

    return (
      <div className="article markdown-body">
        <Header data={navList} />
        <div className='layout'>
          <div className='layoutLeft'>
              {/*<GoBack />*/}
          </div>
          <div className='layoutMiddle'>
            <article className="articleContent">
              <div className="inner">
                  <h1>
                      {title}
                  </h1>
                  {createDate
                      ? <Markdown source={`\`${tag.join('` `')}\` - \`${createDate}\`\n`} />
                      : <h1>标题加载中...</h1>}
                  <div className="content">
                      {content ? <Markdown source={content} /> : <h2>内容加载中...</h2>}
                  </div>
              </div>
            </article>
          </div>
          <div className='layoutRight'>
              <ToTop/>
              {/*<MarkNav*/}
              {/*className="articleMenu"*/}
              {/*source={content}*/}
              {/*headingTopOffset={80}*/}
              {/*/>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
