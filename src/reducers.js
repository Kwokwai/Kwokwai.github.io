import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import tags from './reducers/tags';
import articleList from './reducers/articleList';
import article from './reducers/article'

export default asyncReducers =>
    combineReducers({
        article,
        tags,
        articleList,
        routing: routerReducer,
        ...asyncReducers,
    });
