import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {randomId} from 'utils';
import Markdown from 'components/Markdown';
import './style.css';
import {Badge, Tag} from "antd";
import { withRouter } from 'react-router'
import 'animate.css'


export class PostList extends Component {
    static propTypes = {
        data: PropTypes.array,
        articleList: PropTypes.object,
    };

    static defaultProps = {
        data: [
            {
                title: '示例文章',
                date: new Date()
                    .toLocaleString('chinese', {hour12: false})
                    .replace(/\//gi, '-'),
                url: '/',
            },
        ],
    };

    jumpTo(url) {
        this.props.history.push(url);
    }
    render() {
        const colorList = ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple']
        let postItems = this.props.data.map((p, i) =>
            <article className="post-item" key={`post-${p.createDate}-${p.title}`} >
                <p className="time">
                    {p.createDate}
                </p>
                <div className="tag-bar">
                    {p.tag.map((t, i) =>
                        <Badge key={`post_tag_${randomId()}`}>
                            <Tag color={colorList[i]}>
                                <Link to={`/tag/${t}`}>
                                    {t}
                                </Link>
                            </Tag>
                        </Badge>
                    )}
                </div>
                <div  onClick={() => this.jumpTo(p.url)}>
                    <Link to={p.url}>
                        <h1 className="post-title" title={p.title}>
                            {p.title}
                        </h1>
                    </Link>
                    {<Markdown source={p.summary}/>}
                </div>
            </article>
        );

        return (
            <section id="posts" key="amache" >
                <div className="row">
                    {postItems}
                </div>
            </section>
        );
    }
}

export default withRouter(PostList)
