// import {createStore} from 'redux'
import {createStore} from '../libs/mini_redux'

import reducers from './reducers'

const store = createStore(reducers)

export default store