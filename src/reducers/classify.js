import {fromJS} from 'immutable'
import * as at from '../config'

const INITIAL_STATE = fromJS({
    classify: []
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case at.GET_CLASSIFY:
            return state.update('classify', () => fromJS(action.data))
        default:
            return state
    }
}
