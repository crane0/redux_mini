import {combineReducers} from 'redux'

import {
    ADD,
    MINUS,
    ADD_MSG
} from './action_type'


function num(state=0, action) {
    switch (action.type) {
        case ADD:
            return state + action.data
        case MINUS:
            return state - action.data
        default:
            return state
    }
}


const initMsgs = []

function msgs(state=initMsgs, action) {
    switch (action.type) {
        case ADD_MSG:
            //要使用剩余数组，返回的是新的state，而不改变作为参数的state
            return [action.data, ...state]
        default:
            return state
    }
}


export default combineReducers({
    num,
    msgs
})