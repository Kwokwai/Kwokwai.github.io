import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { randomId } from 'utils';
import defaultThumbs from './images';
import Markdown from 'components/Markdown';
import './style.css';

export class PostList extends Component {
  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [
      {
        title: '示例文章',
        date: new Date()
          .toLocaleString('chinese', { hour12: false })
          .replace(/\//gi, '-'),
        url: '/',
      },
    ],
  };

  _loadThumb = (thumb, i) => {
    if (!thumb.length) {
      return defaultThumbs[i % defaultThumbs.length];
    }
    return thumb;
  };

  render() {
    let postItems = this.props.data.map((p, i) =>
      <article className="post-item" key={`post-${p.time}-${p.title}`}>
        <div className="tag-bar">
          {p.tag.map(t =>
            <Link to={`/tag/${t}`} key={`post_tag_${randomId()}`}>
              <p>
                {t}
              </p>
            </Link>
          )}
        </div>
        <Link to={p.url}>
          <h1 className="post-title" title={p.title}>
            {p.title}
          </h1>
        </Link>
          { <Markdown source={p.summary} /> }
          <Link to={p.url}>
              <h3 className="to-Detail" >
                  查看原文
              </h3>
          </Link>
        <p className="time">
          {p.time}
        </p>
      </article>
    );

    return (
      <section id="posts" key="amache" className="animated fadeInLeftBig">
        <div className="row">
            {postItems}
        </div>
      </section>
    );
  }
}

export default PostList
