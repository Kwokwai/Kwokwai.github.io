import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import tagPost from 'pages/tags/reducer';
import articleList from './reducers/articleList';
import article from './reducers/article'

export default asyncReducers =>
    combineReducers({
        article,
        tagPost,
        articleList,
        routing: routerReducer,
        ...asyncReducers,
    });
