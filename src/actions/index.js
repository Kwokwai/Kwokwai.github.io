import * as at from '../config'
import {getPostInfo, fetchList, fetchPost, fetchPostByTag} from 'posts'

export const fetchPostInfo = () => async dispatch => {
    const postInfo = await getPostInfo()
    dispatch({
        type: at.GET_POST_INFO,
        data: postInfo,
    })
}

export const resetPostList = () => ({
    type: at.RESET_POST_LIST,
})

export const fetchPostList = (perPage, page) => async dispatch => {
    const postList = await fetchList(perPage, page)
    dispatch({
        type: at.FETCH_POST_LIST,
        data: postList,
    })
}

export const resetPostContent = () => ({
    type: at.RESET_POST_CONTENT,
})

export const fetchPostContent = postName => async dispatch => {
    const postContent = await fetchPost(postName)
    dispatch({
        type: at.FETCH_POST_CONTENT,
        data: postContent,
    })
}

export const setTagName = tagName => ({
    type: at.SET_TAG_NAME,
    message: tagName,
})

export const fetchTagPostList = (tagName, perPage, page) => async dispatch => {
    const postList = await fetchPostByTag(tagName, perPage, page)
    dispatch({
        type: at.FETCH_TAG_POST_LIST,
        data: postList,
    })
}
