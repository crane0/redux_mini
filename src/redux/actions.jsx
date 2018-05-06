import {
    ADD,
    MINUS,
    ADD_MSG
} from './action_type'

export const add = (number) => ({type: ADD, data: number})
export const minus = (number) => ({type: MINUS, data: number})
export const add_msg = (msg) => ({type: ADD_MSG, data: msg})
