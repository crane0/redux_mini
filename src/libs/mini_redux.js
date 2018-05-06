/*
* redux核心模块
*
* 1,createStore(reducer)
*       接收一个reducer，返回一个store对象
*
* 2,combineReducers({...reducer})
*       接收一个包含多个reducer函数的对象，返回一个新的reducer函数
*
* 3,store的3个方法：
*   dispatch(action)
*       分发action，会触发reducer的调用，
*       通过reducer来返回一个新的state，并调用所有绑定的listener
*   getState()
*       获取内部管理的state对象
*   subscribe(listener)
*       订阅（绑定）一个state的监听器，只要state更新，就会自动执行定义的listener函数
* */

export const createStore = (reducer) => {
    //内部state
    let state

    //listener可能会有多个，所有将其保存在数组容器中
    const listeners = []

    /*
    * 初次调用reducer，得到state初始值
    *   此时，action只需要一个type就可以，type的属性值？
    * */
    state = reducer(state, {type: '@mini_redux'})


    //获取内部管理的state
    function getState() {
        return state
    }

    /*
    * 分发action，会触发reducer的调用，
    * 并调用所有绑定的listener
    * */
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    //订阅监听
    function subscribe(listener) {
        listeners.push(listener)
    }

    //暴露store对象
    return {getState, dispatch, subscribe}
}


export const combineReducers = (reducers) => {

    /*
    * createStore(reducers)时，reducers就是下面这个返回的函数
    *   并且，在createStore(reducers)时是，会在内部自动执行
    *   其中state就是封装了所有的reducer中的state，以reducer函数名作为key的键值对
    * */
    return function (state={}, action) {

        /*
        * 这个newState用于接收，state中，被改变后的新state
        *   最后将其返回，也就是createStore(reducers)得到的store对象
        * */
        let newState = {}

        //获取reducers中，所有的reducer的函数名，放到数组中。
        const keys = Object.keys(reducers)

        //进行遍历，执行每个reducer，以对应reducer的函数名作为key，新的state作为value，
        //放到newState对象中。
        keys.forEach(key => {

            const childReducer = reducers[key]
            const childState = state[key]
            const newChildState = childReducer(childState, action)

            newState[key] = newChildState
        })

        return newState
    }
}


