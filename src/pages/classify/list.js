import {Component} from "react";
import PropTypes from "prop-types";
import React from "react";
import './style.css'

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
        return (
            this.props.data.map((p, i) =>
                <div className="card" key={i}>
                    <div className="box">
                        {p.summary}
                    </div>
                    <p> {p.classify}</p>
                </div>
            )
        );
    }
}

export default classifyList
