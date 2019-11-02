import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Header from '../../components/Header'
import ToTop from '../../components/ToTop'
import Paging from '../../components/Pagination'
import Loading from '../../components/Loading'
import * as Actions from '../../actions'
// import './style.css'
import ClassifyList from './list'
import {Badge, Tag} from "antd";
import {Link} from "react-router-dom";

const mapStateToProps = ({classify}) => ({classify})

const mapDispatchToProps = dispatch => ({
    classifyActions: bindActionCreators(Actions, dispatch),
})

export class Classify extends Component {
    constructor(props) {
        super(props);
        this.perPage = 10;
        this.state = {
            loading: false
        }
    }

    static propTypes = {
        classify: PropTypes.object,
        classifyActions: PropTypes.object,
    }

    componentDidMount() {
        this.setState({
            loadng: true
        })
        this.props.classifyActions.fetchPostInfo()
        this.props.classifyActions.resetPostList()
        this.props.classifyActions.fetchClassify()
        this.getPostList(1)
    }


    getPostList = (pageNum) => {
        this.props.classifyActions.fetchPostList(this.perPage, pageNum)
        this.pageNum = pageNum
        this.setState({
            loading: false
        })
    }

    render() {
        const {
            classify: {classifyInfo}
        } = this.props.classify.toJS()

        const navList = [
            {
                linkTo: '/',
            },
        ]

        const loading = this.state.loading
        return (
            <div className="classify">
                <Header data={navList}/>
                <div className="layout">
                    <div className="layoutLeft"/>
                    <div className="layoutMiddle">
                        {loading ? <Loading/> :
                            <div className="classifyList">
                                <ClassifyList data={classifyInfo}/>
                            </div>
                        }
                    </div>
                    <div className="layoutRight">
                        <ToTop/>
                    </div>
                </div>
                <div className="footer"/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classify)
