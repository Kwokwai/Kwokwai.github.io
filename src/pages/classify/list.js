import {Component} from "react";
import PropTypes from "prop-types";
import React from "react";
import './style.css'
import {Link} from "react-router-dom";
import {Tag} from "antd";

export class classifyList extends Component {
    static propTypes = {
        data: PropTypes.array,
        articleList: PropTypes.object,
    };

    static defaultProps = {
        data: [
            {
                classify: '测试'
            },
        ],
    };

    render() {
        const list = this.props.data.map((p, i) =>
            <div className="card" key={i}>
                <div className="box">
                    <div className="header">
                        {p.classify}
                    </div>
                    <div className="content">
                        <div className="summary">
                            {p.summary}
                        </div>
                        <Link to={`/archives`}>
                            <button className="more">
                                查看<span>&rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
        return (
                <div className="wrap">
                    {list}
                </div>
            )
    }
}

export default classifyList
