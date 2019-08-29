import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from 'pages/home/reducer';
import tagPost from 'pages/tags/reducer';
import article from 'pages/article/reducer';
import archives from 'pages/archives/reducer'

export default asyncReducers =>
    combineReducers({
        home,
        tagPost,
        article,
        archives,
        routing: routerReducer,
        ...asyncReducers,
    });
